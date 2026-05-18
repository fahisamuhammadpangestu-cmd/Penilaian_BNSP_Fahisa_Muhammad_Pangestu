import { useState } from 'react';
import api from '../../api/axios';
import UserNavbar from '../../components/UserNavbar';

const Contact = () => {
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/report', formData);
      alert('Pesan berhasil dikirim! Admin akan membalas via email.');
      setFormData({ nama: '', email: '', pesan: '' });
    } catch (err) { alert('Gagal mengirim pesan.'); }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F9F4' }}>
      <UserNavbar />
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-[#A3DFBF] overflow-hidden flex flex-col md:flex-row">
          <div className="p-10 md:w-1/2" style={{ backgroundColor: '#1A1F1E' }}>
            <h2 className="text-3xl font-bold text-white mb-6">Hubungi <span style={{ color: '#A3DFBF' }}>Layanan</span></h2>
            <p className="text-gray-400 mb-8">Punya kendala dengan pesanan atau ingin bertanya seputar buku? Tim HisaStore siap membantu Anda.</p>
            <div className="space-y-4 text-sm text-[#A3DFBF]">
              <p>📍 Bekasi, Indonesia</p>
              <p>📧 support@hisastore.com</p>
              <p>📞 +62 812-3456-7890</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-10 md:w-1/2 space-y-4">
            <input type="text" placeholder="Nama Anda" className="w-full p-3 border rounded-xl outline-none focus:ring-2" style={{ borderColor: '#A3DFBF' }}
                   value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} required />
            <input type="email" placeholder="Email Aktif" className="w-full p-3 border rounded-xl outline-none focus:ring-2" style={{ borderColor: '#A3DFBF' }}
                   value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <textarea placeholder="Apa yang ingin Anda tanyakan?" rows="4" className="w-full p-3 border rounded-xl outline-none focus:ring-2" style={{ borderColor: '#A3DFBF' }}
                   value={formData.pesan} onChange={(e) => setFormData({...formData, pesan: e.target.value})} required></textarea>
            <button className="w-full py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 shadow-md" style={{ backgroundColor: '#366650' }}>
              Kirim Pesan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;