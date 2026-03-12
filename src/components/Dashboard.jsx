import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiMessageSquare, FiDollarSign, FiTrendingUp, FiClock, FiMapPin } from 'react-icons/fi';

function Dashboard({ stats, account }) {
  if (!stats) return <div className="card text-center py-12"><p className="text-gray-500">No hay datos</p></div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center"><FiEye className="text-3xl text-sovyx-600 mx-auto mb-2" /><p className="text-gray-500">Alcance Hoy</p><p className="text-2xl font-bold">15,234</p></div>
        <div className="card text-center"><FiMessageSquare className="text-3xl text-green-600 mx-auto mb-2" /><p className="text-gray-500">DMs Hoy</p><p className="text-2xl font-bold">342</p></div>
        <div className="card text-center"><FiDollarSign className="text-3xl text-blue-600 mx-auto mb-2" /><p className="text-gray-500">Conversiones</p><p className="text-2xl font-bold">28</p></div>
        <div className="card text-center"><FiTrendingUp className="text-3xl text-purple-600 mx-auto mb-2" /><p className="text-gray-500">Tasa</p><p className="text-2xl font-bold">8.2%</p></div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Posts Recientes</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div><p className="font-semibold">Post #{i}</p><p className="text-sm text-gray-500">Hace {i*2}h</p></div>
              <div className="flex gap-6">
                <div><FiEye className="text-sovyx-600 mx-auto" /><span className="text-sm">15.2k</span></div>
                <div><FiMessageSquare className="text-green-600 mx-auto" /><span className="text-sm">342</span></div>
                <div><FiDollarSign className="text-blue-600 mx-auto" /><span className="text-sm">28</span></div>
              </div>
              <Link to={`/resultados/post${i}`} className="text-sovyx-600 text-sm">Ver →</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-r from-sovyx-50 to-blue-50">
        <h3 className="text-xl font-bold mb-4">Recomendaciones IA3</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg"><FiClock className="text-sovyx-600 text-xl mb-2" /><p className="text-sm text-gray-500">Mejor Horario</p><p className="text-lg font-bold">21:30</p></div>
          <div className="bg-white p-4 rounded-lg"><FiMapPin className="text-sovyx-600 text-xl mb-2" /><p className="text-sm text-gray-500">Top Ubicación</p><p className="text-lg font-bold">Miami</p></div>
          <div className="bg-white p-4 rounded-lg"><FiTrendingUp className="text-sovyx-600 text-xl mb-2" /><p className="text-sm text-gray-500">Mejor Tipo</p><p className="text-lg font-bold capitalize">problema</p></div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg"><p className="text-green-800">🎯 Próximo post optimizado para coaches de 34-42 en Miami</p></div>
      </div>
    </div>
  );
}

export default Dashboard;
