import React, { useState, useEffect } from 'react';
import { FiUser, FiUsers } from 'react-icons/fi';
import api from '../services/api';

function AccountSelector({ onSelect }) {
  const [accounts, setAccounts] = useState({ mis_cuentas: [], clientes: [] });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAccounts(); }, []);

  const loadAccounts = async () => {
    try {
      const res = await api.get('/accounts');
      setAccounts(res.data);
    } catch (error) {
      console.error('Error cargando cuentas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="card text-center py-8">Cargando...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Seleccionar Cuenta</h2>
      
      {accounts.mis_cuentas?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-sovyx-700 mb-4 flex items-center">
            <FiUser className="mr-2" /> Mis Cuentas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.mis_cuentas.map(acc => (
              <button key={acc.id} onClick={() => { setSelected(acc); onSelect(acc); }}
                className={`p-4 rounded-lg border-2 transition ${selected?.id === acc.id ? 'border-sovyx-600 bg-sovyx-50' : 'border-gray-200 hover:border-sovyx-300'}`}>
                <div className="font-bold text-lg">{acc.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {acc.posts_plan} posts • {acc.budget === 0 ? '🔥 Hack mode' : `${acc.budget}$/día`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {accounts.clientes?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-sovyx-700 mb-4 flex items-center">
            <FiUsers className="mr-2" /> Clientes VIP
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {accounts.clientes.map(acc => (
              <button key={acc.id} onClick={() => { setSelected(acc); onSelect(acc); }}
                className={`p-4 rounded-lg border-2 transition ${selected?.id === acc.id ? 'border-sovyx-600 bg-sovyx-50' : 'border-gray-200 hover:border-sovyx-300'}`}>
                <div className="font-semibold">{acc.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {acc.posts_plan} posts • {acc.budget}$/día
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSelector;
