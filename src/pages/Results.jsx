import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiMessageSquare, FiDollarSign, FiUsers, FiClock, FiMapPin, FiRefreshCw } from 'react-icons/fi';
import api from '../services/api';

function Results() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadResults();
  }, [postId]);

  const loadResults = async () => {
    setLoading(true);
    try {
      // En producción, usarías:
      // const response = await api.get(`/posts/${postId}`);
      // setResults(response.data);
      
      // Simulación para pruebas
      setTimeout(() => {
        setResults({
          postId,
          post: {
            id: postId,
            cuenta: 'sovyx',
            tipo: 'problema',
            nicho: 'fitness_coach',
            publicado: new Date().toISOString()
          },
          metricas: {
            alcance: 15234,
            dms_recibidos: 342,
            conversiones: 28,
            compradores: 5,
            tasa_conversion: 8.2
          },
          patron_compradores: {
            edad: '34-42',
            pais: 'USA',
            ciudades: { ciudades: ['Miami', 'Medellín', 'Toronto'] },
            horarios: { publicar: 21, cerrar: 21 },
            intereses: ['Coaching', 'Fitness', 'Emprendimiento']
          },
          recomendaciones: 'Publica el próximo post a las 21:30 con enfoque en coaches de Miami. Usa palabras como "inversión" y "resultados".',
          compradores_detectados: 5,
          ia3_activada: true
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando resultados:', error);
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadResults();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sovyx-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-sovyx-600 hover:text-sovyx-700 flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Volver al Dashboard
        </button>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-sovyx-700 mb-4">
          Resultados del Post
        </h1>
        <p className="text-gray-600">ID: {postId}</p>
        {results?.post && (
          <div className="mt-2 inline-flex gap-2">
            <span className="bg-sovyx-100 text-sovyx-800 px-3 py-1 rounded-full text-sm">
              {results.post.cuenta}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm capitalize">
              {results.post.tipo}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {results.post.nicho}
            </span>
          </div>
        )}
      </div>

      {results && (
        <div className="space-y-8">
          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <FiEye className="text-4xl text-sovyx-600 mx-auto mb-4" />
              <h3 className="text-gray-500 mb-2">Alcance</h3>
              <p className="text-3xl font-bold">{results.metricas.alcance.toLocaleString()}</p>
            </div>
            
            <div className="card text-center">
              <FiMessageSquare className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-gray-500 mb-2">DMs Recibidos</h3>
              <p className="text-3xl font-bold">{results.metricas.dms_recibidos}</p>
            </div>
            
            <div className="card text-center">
              <FiDollarSign className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-500 mb-2">Conversiones</h3>
              <p className="text-3xl font-bold">{results.metricas.conversiones}</p>
            </div>
            
            <div className="card text-center">
              <FiUsers className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-500 mb-2">Compradores</h3>
              <p className="text-3xl font-bold">{results.metricas.compradores}</p>
            </div>
          </div>

          {/* Badge de IA3 */}
          {results.ia3_activada && (
            <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                <div>
                  <p className="font-semibold">IA3 ACTIVADA</p>
                  <p className="text-sm">Analizando {results.compradores_detectados} compradores para mejorar IA1 e IA2</p>
                </div>
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                EN PROGRESO
              </div>
            </div>
          )}

          {/* Patrón de Compradores */}
          {results.patron_compradores && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">🧠</span> Patrón de Compradores (IA3)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-sovyx-50 p-4 rounded-lg">
                  <FiClock className="text-sovyx-600 text-xl mb-2" />
                  <h3 className="font-semibold text-gray-500 mb-1">Edad</h3>
                  <p className="text-2xl font-bold">{results.patron_compradores.edad}</p>
                </div>
                
                <div className="bg-sovyx-50 p-4 rounded-lg">
                  <FiMapPin className="text-sovyx-600 text-xl mb-2" />
                  <h3 className="font-semibold text-gray-500 mb-1">País</h3>
                  <p className="text-2xl font-bold">{results.patron_compradores.pais}</p>
                </div>
                
                <div className="bg-sovyx-50 p-4 rounded-lg">
                  <FiClock className="text-sovyx-600 text-xl mb-2" />
                  <h3 className="font-semibold text-gray-500 mb-1">Mejor Hora</h3>
                  <p className="text-2xl font-bold">{results.patron_compradores.horarios?.publicar}:00</p>
                </div>
              </div>

              {results.patron_compradores.ciudades && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Ciudades con más compradores</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.patron_compradores.ciudades.ciudades?.map((ciudad, i) => (
                      <span key={i} className="bg-sovyx-100 text-sovyx-800 px-4 py-2 rounded-full text-sm font-medium">
                        {ciudad}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {results.patron_compradores.intereses && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Intereses comunes</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.patron_compradores.intereses.map((interes, i) => (
                      <span key={i} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                        {interes}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recomendaciones */}
          <div className="card bg-gradient-to-r from-sovyx-50 to-blue-50">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-2">🎯</span> Recomendación IA3
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {results.recomendaciones}
            </p>
            
            <div className="flex gap-4">
              <Link
                to="/crear"
                state={{ account: { id: 'sovyx', name: 'SOVYX', budget: 0, posts_plan: 9 } }}
                className="btn-primary flex-1 py-3 text-center"
              >
                Crear Siguiente Post Optimizado
              </Link>
              
              <button
                onClick={() => navigate('/')}
                className="btn-secondary flex-1 py-3"
              >
                Ver Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
