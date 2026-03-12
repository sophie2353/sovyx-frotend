import React from 'react';

function ProgressBar({ progress }) {
  const getColor = () => {
    if (progress < 20) return 'bg-gray-400';
    if (progress < 40) return 'bg-blue-400';
    if (progress < 60) return 'bg-yellow-400';
    if (progress < 80) return 'bg-orange-400';
    return 'bg-green-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progreso: {progress}%</span>
        <span className="text-sm font-medium text-sovyx-600">
          {progress < 20 ? 'Preparando...' : progress < 40 ? 'IA1 mejorando copy...' : progress < 60 ? 'Aplicando segmentación...' : progress < 80 ? 'Publicando...' : '¡Listo!'}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div className={`${getColor()} h-4 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }} />
      </div>
      <div className="grid grid-cols-5 gap-1 mt-4 text-xs">
        <div className={`text-center p-2 rounded ${progress >= 20 ? 'bg-sovyx-50 text-sovyx-700' : 'text-gray-400'}`}>📦 20%</div>
        <div className={`text-center p-2 rounded ${progress >= 40 ? 'bg-sovyx-50 text-sovyx-700' : 'text-gray-400'}`}>🤖 40%</div>
        <div className={`text-center p-2 rounded ${progress >= 60 ? 'bg-sovyx-50 text-sovyx-700' : 'text-gray-400'}`}>🎯 60%</div>
        <div className={`text-center p-2 rounded ${progress >= 80 ? 'bg-sovyx-50 text-sovyx-700' : 'text-gray-400'}`}>📤 80%</div>
        <div className={`text-center p-2 rounded ${progress >= 100 ? 'bg-sovyx-50 text-sovyx-700' : 'text-gray-400'}`}>✅ 100%</div>
      </div>
    </div>
  );
}

export default ProgressBar;
