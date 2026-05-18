import { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminSidebar from '../../components/AdminSidebar';

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/admin/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const updateStatus = async (id, statusBaru) => {
    try {
      await api.put(`/transactions/${id}/status`, { status: statusBaru });
      alert(`Status menjadi: ${statusBaru}`);
      setSelectedId(null);
      fetchTransactions();
    } catch (err) { alert('Gagal update status'); }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm('Hapus transaksi ini dari database?')) {
      try {
        await api.delete(`/transactions/${id}`);
        alert('Berhasil dihapus');
        fetchTransactions();
      } catch (err) { alert('Gagal menghapus'); }
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F0F9F4' }}>
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        <h1 className="text-3xl font-black mb-8">Daftar Transaksi Masuk</h1>

        <div className="bg-white rounded-3xl shadow-sm border border-[#A3DFBF] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#1A1F1E] text-white text-sm">
              <tr>
                <th className="p-5">User</th>
                <th className="p-5">Buku</th>
                <th className="p-5">Total</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map((trx) => (
                <tr key={trx.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  {/* FIX: Mengambil nama pengorder asli dari database user */}
                  <td className="p-5 font-bold">
                    {trx.user?.name || trx.user?.nama || `User (ID: ${trx.user_id})`}
                  </td>
                  <td className="p-5 text-gray-600">{trx.book?.judul || 'Buku'}</td>
                  <td className="p-5 font-black text-[#366650]">Rp {trx.total_harga?.toLocaleString()}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      trx.status === 'proses' ? 'bg-yellow-100 text-yellow-600' : 
                      trx.status === 'berhasil' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center items-center gap-3">
                      {trx.status === 'proses' && (
                        selectedId !== trx.id ? (
                          <button onClick={() => setSelectedId(trx.id)} className="bg-[#366650] text-white px-4 py-2 rounded-xl font-bold">Validasi</button>
                        ) : (
                          <div className="flex gap-2 bg-gray-100 p-2 rounded-xl border border-[#366650]">
                            <button onClick={() => updateStatus(trx.id, 'berhasil')} className="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-bold">TERIMA</button>
                            <button onClick={() => updateStatus(trx.id, 'ditolak')} className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold">TOLAK</button>
                            <button onClick={() => setSelectedId(null)} className="text-gray-400 font-bold px-1">✕</button>
                          </div>
                        )
                      )}
                      <button onClick={() => deleteTransaction(trx.id)} className="text-red-400 hover:text-red-600 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageTransactions;