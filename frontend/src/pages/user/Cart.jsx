import { useEffect, useState } from 'react';
import api from '../../api/axios';
import UserNavbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error("Gagal mengambil data keranjang:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const removeItem = async (id) => {
    if (window.confirm('Hapus item ini dari keranjang?')) {
      try {
        await api.delete(`/cart/${id}`);
        fetchCart();
        setSelectedItems(selectedItems.filter(itemId => itemId !== id));
      } catch (err) {
        alert('Gagal menghapus item.');
      }
    }
  };

  // Hitung total harga hanya untuk yang diceklis
  const totalHargaValue = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => {
      const harga = item.book?.harga || 0;
      return total + (harga * item.jumlah);
    }, 0);

  const handleCheckout = async () => {
    // Ambil data item yang hanya diceklis saja
    const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.id));

    if (itemsToCheckout.length === 0) {
      alert("Pilih minimal satu buku untuk dibayar!");
      return;
    }

    try {
      // 1. Susun payload untuk Laravel
      const payload = {
        items: itemsToCheckout.map(item => ({
          book_id: item.book_id, // Gunakan book_id dari data keranjang
          jumlah: item.jumlah || 1
        }))
      };

      // 2. Kirim ke API Transactions
      const res = await api.post('/transactions', payload);

      if (res.data.success) {
        alert('Pesanan berhasil dibuat!');
        
        // 3. Susun Pesan WhatsApp
        const daftarBuku = itemsToCheckout
          .map(item => `- ${item.book?.judul} (${item.jumlah}x)`)
          .join('%0A');
        
        const pesanWA = `Halo Admin, saya ingin membayar pesanan keranjang:%0A${daftarBuku}%0A%0ATotal Bayar: Rp ${totalHargaValue.toLocaleString()}`;
        
        window.open(`https://wa.me/6281998197399?text=${pesanWA}`, '_blank');
        
        // 4. Opsional: Hapus item yang sudah dibeli dari keranjang di database
        // await api.delete('/cart/clear-selected', { data: { ids: selectedItems } });

        navigate('/history');
      }
    } catch (err) {
      console.error("Gagal checkout:", err.response?.data || err.message);
      alert("Gagal memproses checkout. Pastikan server Laravel menyala.");
    }
  };

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#F0F9F4' }}>
      <UserNavbar />
      
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black" style={{ color: '#1A1F1E' }}>Keranjang Belanja</h1>
          <p className="text-gray-500 text-sm">Pilih buku yang ingin kamu bayar sekarang.</p>
        </header>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-[#A3DFBF]">
            <p className="text-gray-400 font-medium">Keranjangmu masih kosong.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white p-6 rounded-3xl shadow-sm border transition-all flex items-center gap-6 relative group ${
                  selectedItems.includes(item.id) ? 'border-[#366650] ring-1 ring-[#366650]' : 'border-transparent'
                }`}
              >
                <input 
                  type="checkbox" 
                  className="w-6 h-6 accent-[#366650] cursor-pointer"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  disabled={!item.book}
                />

                <div className="flex-1 flex items-center gap-4">
                {/*Gambar Buku secara Dinamis */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner overflow-hidden" style={{ backgroundColor: '#A3DFBF' }}>
                  {item.book?.image ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${item.book.image}`} 
                      alt={item.book?.judul} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span>📖</span>
                  )}
                </div>

                {/*Detail Informasi Buku */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[#1A1F1E]">
                    {item.book?.judul || <span className="text-red-400 italic font-normal">Buku tidak tersedia</span>}
                  </h3>
                  <p className="text-sm text-gray-500">Jumlah: {item.jumlah}</p>
                  <p className="font-bold text-[#366650]">
                    Rp {item.book?.harga?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  title="Hapus"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Panel Checkout */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Terpilih ({selectedItems.length}):</p>
              <p className="text-2xl font-black text-[#1A1F1E]">Rp {totalHargaValue.toLocaleString()}</p>
            </div>
            <button 
              onClick={handleCheckout}
              className="px-10 py-4 rounded-2xl text-white font-bold transition-transform active:scale-95 shadow-md hover:opacity-90"
              style={{ backgroundColor: '#366650' }}
            >
              Bayar via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;