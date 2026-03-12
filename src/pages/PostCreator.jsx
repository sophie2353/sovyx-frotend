import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PhotoUploader from '../components/PhotoUploader';
import ProgressBar from '../components/ProgressBar';
import VerificationModal from '../components/VerificationModal';
import api from '../services/api';

function PostCreator() {
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = location.state || {};

  const [formData, setFormData] = useState({ texto: '', tipo: 'problema', fotos: [], programar: false, fechaProgramada: '' });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVerification, setShowVerification] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  if (!account) { navigate('/'); return null; }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fotos.length === 0) { toast.error('Selecciona al menos 1 foto'); return; }
    if (!formData.texto.trim()) { toast.error('Escribe un texto'); return; }
    setPreviewData({
      account: account.name, texto: formData.texto, tipo: formData.tipo,
      fotos: formData.fotos.length, programado: formData.programar ? new Date(formData.fechaProgramada).toLocaleString() : 'ahora',
      budget: account.budget
    });
    setShowVerification(true);
  };

  const confirmPublish = async () => {
    setShowVerification(false); setUploading(true);
    const interval = setInterval(() => setProgress(p => p >= 80 ? (clearInterval(interval), 80) : p + 10), 800);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(formData.fotos[0]);
      reader.onload = async () => {
        const res = await api.post('/posts/publicar', {
          imageUrl: reader.result, caption: formData.texto, tipo: formData.tipo,
          dia: 1, numero: 1, cuentaId: account.id
        });
        setProgress(100);
        toast.success('✅ Publicado');
        setTimeout(() => navigate(`/resultados/${res.data.postId}`), 1500);
      };
    } catch (error) {
      toast.error('Error: ' + error.message); setProgress(0); setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="text-sovyx-600 mb-4">← Volver</button>
      <h1 className="text-3xl font-bold">Crear Post</h1>
      <p className="mt-2">Cuenta: <span className="font-semibold">{account.name}</span></p>
      <div className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${account.budget === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
        {account.budget === 0 ? '🔓 Modo Hack' : `💰 ${account.budget}$/día`}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="card">
          <label className="block font-semibold mb-3">Tipo</label>
          <div className="flex gap-6">
            {['problema', 'sueno', 'social'].map(t => (
              <label key={t} className="flex items-center">
                <input type="radio" name="tipo" value={t} checked={formData.tipo === t} onChange={e => setFormData({...formData, tipo: e.target.value})} className="mr-2" />
                <span className="capitalize">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <label className="block font-semibold mb-3">Texto</label>
          <textarea value={formData.texto} onChange={e => setFormData({...formData, texto: e.target.value})} rows="4" className="input" required />
        </div>

        <div className="card">
          <label className="block font-semibold mb-3">Fotos</label>
          <PhotoUploader onPhotosChange={f => setFormData({...formData, fotos: f})} />
        </div>

        <div className="card">
          <label className="flex items-center mb-3">
            <input type="checkbox" checked={formData.programar} onChange={e => setFormData({...formData, programar: e.target.checked})} className="mr-2" />
            <span className="font-semibold">Programar</span>
          </label>
          {formData.programar && <input type="datetime-local" value={formData.fechaProgramada} onChange={e => setFormData({...formData, fechaProgramada: e.target.value})} className="input" required />}
        </div>

        <button type="submit" disabled={uploading} className="btn-primary w-full py-4 text-lg">🚀 Publicar</button>

        {uploading && <div className="card"><ProgressBar progress={progress} /></div>}
      </form>

      <VerificationModal isOpen={showVerification} onClose={() => setShowVerification(false)} onConfirm={confirmPublish} data={previewData} />
    </div>
  );
}

export default PostCreator;
