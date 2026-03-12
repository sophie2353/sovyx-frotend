import React from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

function VerificationModal({ isOpen, onClose, onConfirm, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center"><FiAlertCircle className="text-yellow-500 text-2xl mr-2" /><h2 className="text-2xl font-bold">Verificar</h2></div>
          <button onClick={onClose}><FiX size={24} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Cuenta</p><p className="font-semibold text-lg">{data.account}</p></div>
          <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Tipo</p><p className="font-semibold text-lg capitalize">{data.tipo}</p></div>
          <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Texto</p><p className="font-semibold">{data.texto}</p></div>
          <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Fotos</p><p className="font-semibold text-lg">{data.fotos} foto(s)</p></div>
          <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Programado</p><p className="font-semibold text-lg">{data.programado}</p></div>
          {data.account?.includes('CLIENTE') && <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm text-blue-700">💰 Inversión: {data.budget || 100}$/día</p></div>}
          {data.account?.includes('SOVYX') && <div className="bg-green-50 p-4 rounded-lg"><p className="text-sm text-green-700">🔓 Modo Hack: sin presupuesto</p></div>}
        </div>
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex gap-4">
            <button onClick={onClose} className="btn-secondary flex-1 py-3">Cancelar</button>
            <button onClick={onConfirm} className="btn-primary flex-1 py-3 flex items-center justify-center"><FiCheck className="mr-2" />Publicar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationModal;
