import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import UserNavbar from '../../components/UserNavbar';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Ambil data dari state navigasi
  const { book, jumlah, items, total, isFromCart } = location.state || {};

  const ADMIN_PHONE = "6281998197399"; 

  if (!book && !items) {
    return (
      <div className="p-10 text-center min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold">Data pesanan tidak ditemukan.</p>
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    try {
      let payload;
      let daftarBukuTeks = "";

      // Kondisi 1: Jika datang dari Keranjang (Banyak Buku)
      if (isFromCart && items) {
        payload = {
          items: items.map(item => ({
            book_id: item.book_id,
            jumlah: item.jumlah
          }))
        };
        daftarBukuTeks = items.map(item => `- ${item.book.judul} (${item.jumlah}x)`).join('%0A');
      } 
      // Kondisi 2: Jika Beli Sekarang (Satu Buku)
      else {
        payload = {
          book_id: book.id,
          jumlah: jumlah,
          status: 'proses'
        };
        daftarBukuTeks = `- ${book.judul} (${jumlah}x)`;
      }

      // 1. Simpan ke Database Laravel
      await api.post('/transactions', payload);

      // 2. Susun Format Pesan WhatsApp
      const totalBayar = total || (book.harga * jumlah);
      const pesanWA = `Halo Admin HisaStore, saya ingin membayar pesanan:%0A%0A` +
                      `${daftarBukuTeks}%0A%0A` +
                      `*Total Bayar: Rp ${totalBayar.toLocaleString()}*%0A%0A` +
                      `Mohon segera diproses ya!`;

      // 3. Eksekusi: Buka WA dan navigasi ke History
      alert('Pesanan dicatat! Membuka WhatsApp...');
      window.open(`https://wa.me/${ADMIN_PHONE}?text=${pesanWA}`, '_blank');
      
      navigate('/history');
    } catch (err) {
      console.error("Gagal simpan transaksi:", err.response?.data || err.message);
      alert('Gagal membuat pesanan. Pastikan server Laravel aktif.');
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#F0F9F4' }}>
      <UserNavbar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#A3DFBF]">
          <div className="p-8 text-center bg-[#1A1F1E] text-white">
            <h1 className="text-2xl font-bold">Ringkasan Pesanan</h1>
          </div>

          <div className="p-8">
            <div className="space-y-4 mb-6 border-b pb-6 text-[#1A1F1E]">
              {isFromCart ? (
                items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600 truncate mr-4">{item.book.judul} <span className="text-xs font-bold">(x{item.jumlah})</span></span>
                    <span className="font-bold flex-shrink-0">Rp {(item.book.harga * item.jumlah).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">{book.judul} <span className="font-bold">(x{jumlah})</span></span>
                  <span className="font-bold">Rp {(book.harga * jumlah).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-8 bg-[#F0F9F4] p-4 rounded-2xl">
              <span className="text-lg font-bold text-[#1A1F1E]">Total Pembayaran</span>
              <span className="text-2xl font-black text-[#366650]">
                Rp {(total || (book.harga * jumlah)).toLocaleString()}
              </span>
            </div>

            <button 
              onClick={handleConfirmPayment}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-3"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Bayar via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;