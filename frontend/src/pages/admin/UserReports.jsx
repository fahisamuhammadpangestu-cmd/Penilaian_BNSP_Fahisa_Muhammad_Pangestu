import { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminSidebar from '../../components/AdminSidebar';

const UserReports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await api.get('/reports');
      setReports(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchReports(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Hapus laporan ini?')) {
      await api.delete(`/reports/${id}`);
      fetchReports();
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F0F9F4' }}>
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1A1F1E' }}>Laporan & Pesan User</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-3xl border border-[#A3DFBF] shadow-sm relative group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#1A1F1E' }}>{report.nama}</h3>
                  <p className="text-xs text-gray-400">{report.email}</p>
                </div>
                <button onClick={() => handleDelete(report.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">Hapus</button>
              </div>
              <p className="text-gray-600 text-sm italic">"{report.pesan}"</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                <a href={`mailto:${report.email}`} className="text-xs font-bold uppercase tracking-widest" style={{ color: '#366650' }}>Balas via Email →</a>
              </div>
            </div>
          ))}
          {reports.length === 0 && <p className="text-gray-500 italic">Belum ada laporan masuk.</p>}
        </div>
      </main>
    </div>
  );
};

export default UserReports;