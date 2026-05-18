import { useEffect, useState } from 'react';
import api from '../../api/axios';
import UserNavbar from '../../components/UserNavbar';

const History = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/transactions/user');
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Fungsi helper untuk warna status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'berhasil': return 'bg-green-100 text-green-700 border-green-200';
      case 'ditolak': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus riwayat pesanan ini?')) {
      try {
        await api.delete(`/transactions/${id}`);
        fetchHistory(); // Refresh data
        alert('Riwayat dihapus.');
      } catch (err) {
        alert('Gagal menghapus riwayat.');
      }
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#F0F9F4' }}>
      <UserNavbar />
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold" style={{ color: '#1A1F1E' }}>Riwayat Pesanan</h1>
          <p className="text-gray-500">Pantau status buku yang baru saja Anda beli.</p>
        </header>

        {transactions.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border-2 border-dashed border-[#A3DFBF]">
            <p className="text-gray-500 italic">Belum ada riwayat transaksi.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((trx) => (
              <div 
                key={trx.id} 
                className="bg-white p-6 rounded-3xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md relative group"
              >
                {/* Tombol Hapus */}
                <button 
                  onClick={() => handleDelete(trx.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  title="Hapus Riwayat"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>

                <div className="flex gap-4 items-center">
                {/* Gambar Buku secara Dinamis */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner overflow-hidden" style={{ backgroundColor: '#A3DFBF' }}>
                  {trx.book?.image ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${trx.book.image}`} 
                      alt={trx.book?.judul} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span>📖</span>
                  )}
                </div>

                {/*Detail Judul dan Tanggal Transaksi */}
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#1A1F1E' }}>
                    {trx.book?.judul || 'Buku Terhapus'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end">
                  <p className="font-black text-xl mb-2" style={{ color: '#366650' }}>Rp {trx.total_harga.toLocaleString()}</p>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyle(trx.status)}`}>
                    {trx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;