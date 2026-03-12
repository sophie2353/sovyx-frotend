import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTrendingUp, FiDollarSign, FiClock, FiArrowRight } from 'react-icons/fi';
import AccountSelector from '../components/AccountSelector';
import Dashboard from '../components/Dashboard';
import api from '../services/api';

function Home() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (selectedAccount) loadDashboard(); }, [selectedAccount]);

  const loadDashboard = async () => {
    setLoading(true);
    try { setStats({}); } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4"><span className="text-6xl mr-2">🗿</span><h1 className="text-5xl font-bold text-sovyx-700">SOVYX</h1></div>
        <p className="text-xl text-gray-600">High Ticket Segmentation AI</p>
      </div>

      <div className="mb-8"><AccountSelector onSelect={setSelectedAccount} /></div>

      {selectedAccount && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card"><FiUsers className="text-3xl text-sovyx-600 mb-2" /><h3 className="text-gray-500">Cuenta</h3><p className="text-2xl font-bold">{selectedAccount.name}</p></div>
            <div className="card"><FiTrendingUp className="text-3xl text-green-600 mb-2" /><h3 className="text-gray-500">Plan</h3><p className="text-2xl font-bold">{selectedAccount.posts_plan} posts</p></div>
            <div className="card"><FiDollarSign className="text-3xl text-blue-600 mb-2" /><h3 className="text-gray-500">Conversiones</h3><p className="text-2xl font-bold">0</p></div>
            <div className="card"><FiClock className="text-3xl text-purple-600 mb-2" /><h3 className="text-gray-500">Próximo</h3><p className="text-sm font-medium">21:30</p></div>
          </div>

          <div className="text-center mb-8">
            <Link to="/crear" state={{ account: selectedAccount }} className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              + Nuevo Post <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {loading ? <div className="text-center py-12">Cargando...</div> : <Dashboard stats={stats} account={selectedAccount} />}
        </>
      )}
    </div>
  );
}

export default Home;
