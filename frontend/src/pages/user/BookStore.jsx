import { useEffect, useState } from 'react';
import api from '../../api/axios';
import UserNavbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); 
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data);
    } catch (err) { console.error(err); }
  };

  // Pencarian & Filter
  const filteredBooks = books.filter(book => {
    return book.judul.toLowerCase().includes(search.toLowerCase()) &&
           (filterGenre === '' || book.genre === filterGenre);
  });

  const handleAddToCart = async (bookId) => {
    try {
      await api.post('/cart', { book_id: bookId, jumlah: count });
      alert('Berhasil masuk keranjang!');
      setSelectedBook(null);
    } catch (err) { alert('Gagal masuk keranjang'); }
  };

  const handleBuyNow = (book) => {
    navigate('/payment', { state: { book, jumlah: count } });
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#F0F9F4' }}>
      <UserNavbar />
      
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Fitur Search & Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-[#A3DFBF]">
          <input 
            type="text" placeholder="Cari judul buku..." 
            className="w-full md:w-1/2 p-3 rounded-xl border-2 outline-none focus:ring-2"
            style={{ borderColor: '#A3DFBF' }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="w-full md:w-1/4 p-3 rounded-xl border-2 outline-none"
            style={{ borderColor: '#A3DFBF' }}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">Semua Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Horror">Horror</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-transparent hover:border-[#A3DFBF] transition-all group flex flex-col">
              <div className="h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                {book.image ? (
                  <img src={`http://127.0.0.1:8000/storage/${book.image}`} alt={book.judul} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">📖</span>
                )}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#366650' }}>
                  {book.genre}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold line-clamp-2 mb-1" style={{ color: '#1A1F1E' }}>{book.judul}</h3>
                <p className="text-sm text-gray-400 mb-4 font-medium">Oleh {book.author}</p>
                <p className="text-xl font-black mb-6" style={{ color: '#366650' }}>Rp {book.harga.toLocaleString()}</p>
                
                <button 
                  onClick={() => { setSelectedBook(book); setCount(1); }}
                  className="w-full py-3 rounded-xl font-bold transition-all text-white"
                  style={{ backgroundColor: '#4F9B7E' }}
                >
                  Informasi Lebih Lanjut
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DETAIL BUKU */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl">
            {/* Sisi Kiri: Gambar */}
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-10 overflow-hidden" style={{ backgroundColor: '#A3DFBF' }}>
              {selectedBook.image ? (
                <img 
                  src={`http://127.0.0.1:8000/storage/${selectedBook.image}`} 
                  alt={selectedBook.judul} 
                  className="w-full h-72 object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105" 
                />
              ) : (
                <span className="text-9xl">📖</span>
              )}
            </div>

            {/* Sisi Kanan: Info & Action */}
            <div className="md:w-1/2 p-10 relative">
              <button onClick={() => setSelectedBook(null)} className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-black">✕</button>
              
              <span className="text-xs font-bold uppercase tracking-widest text-[#4F9B7E]">{selectedBook.genre} • {selectedBook.tahun || '2024'}</span>
              <h2 className="text-3xl font-black mt-2 mb-4" style={{ color: '#1A1F1E' }}>{selectedBook.judul}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{selectedBook.sinopsis}</p>
              
              <p className="text-3xl font-black mb-8" style={{ color: '#366650' }}>Rp {selectedBook.harga.toLocaleString()}</p>

              {/* Info Stock / Counter Pesanan */}
              <div className="mb-8">
                <div className="flex items-center justify-between bg-gray-100 w-full p-3 rounded-xl">
                  <div className="text-sm text-gray-600 font-semibold">
                    Stock buku saat ini:
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#1A1F1E' }}>
                    {selectedBook.stok !== undefined ? selectedBook.stok : (selectedBook.stock ?? 0)}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 bg-gray-100 w-fit p-2 rounded-xl">
                  <button
                    onClick={() => count > 1 && setCount(count - 1)}
                    className="w-10 h-10 bg-white rounded-lg font-bold shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">{count}</span>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="w-10 h-10 bg-white rounded-lg font-bold shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>


              {/* Tombol Aksi */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleBuyNow(selectedBook)}
                  className="py-4 rounded-2xl text-white font-bold shadow-lg hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#1A1F1E' }}
                >
                  Beli Sekarang
                </button>
                <button 
                  onClick={() => handleAddToCart(selectedBook.id)}
                  className="py-4 rounded-2xl font-bold border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: '#366650', color: '#366650' }}
                >
                  Masuk Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStore;