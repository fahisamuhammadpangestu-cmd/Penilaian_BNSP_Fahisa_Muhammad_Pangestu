import { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminSidebar from '../../components/AdminSidebar';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // State Form
  const [judul, setJudul] = useState('');
  const [author, setAuthor] = useState('');
  const [harga, setHarga] = useState('');
  const [stock, setStock] = useState('');
  const [genre, setGenre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal mengambil data buku:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Membuka modal untuk Edit
  const openEditModal = (book) => {
    setIsEditMode(true);
    setSelectedBookId(book.id);
    setJudul(book.judul);
    setAuthor(book.author);
    setHarga(book.harga);
    setStock(book.stock);
    setGenre(book.genre);
    setSinopsis(book.sinopsis || '');
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setJudul(''); setAuthor(''); setHarga(''); setStock(''); 
    setGenre(''); setSinopsis(''); setImageFile(null);
    setIsEditMode(false);
    setSelectedBookId(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  
  // Data Text
  formData.append('judul', judul);
  formData.append('author', author);
  formData.append('harga', harga);
  formData.append('stock', stock);
  formData.append('genre', genre);
  formData.append('sinopsis', sinopsis);

  if (isEditMode) {
    formData.append('_method', 'PUT');
  }

  // File Gambar
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const url = isEditMode ? `/books/${selectedBookId}` : '/books';
    
    await api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert(isEditMode ? 'Buku diupdate!' : 'Buku ditambah!');
    setIsModalOpen(false);
    resetForm();
    fetchBooks();
  } catch (err) {
    console.error("Error detail:", err.response?.data);
    alert('Terjadi kesalahan, cek konsol.');
  }
  };

  const deleteBook = async (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      try {
        await api.delete(`/books/${id}`);
        fetchBooks();
      } catch (err) { alert('Gagal menghapus buku'); }
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F0F9F4' }}>
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black" style={{ color: '#1A1F1E' }}>Kelola Inventaris Buku</h1>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105 active:scale-95" 
            style={{ backgroundColor: '#366650' }}
          >
            + Tambah Buku Baru
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#A3DFBF] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead style={{ backgroundColor: '#1A1F1E' }}>
              <tr>
                <th className="p-5 text-white font-semibold">Buku</th>
                <th className="p-5 text-white font-semibold">Harga</th>
                <th className="p-5 text-white font-semibold">Stok</th>
                <th className="p-5 text-white font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-[#F0F9F4] hover:bg-gray-50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border">
                         {book.image ? (
                           <img 
                            src={`http://127.0.0.1:8000/storage/${book.image}`} 
                            alt="" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Cover'; }}
                           />
                         ) : (
                           <div className="flex items-center justify-center h-full text-[10px] text-gray-400">No Image</div>
                         )}
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1F1E]">{book.judul}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-semibold text-[#366650]">Rp {book.harga?.toLocaleString()}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${book.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {book.stock} Pcs
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button onClick={() => openEditModal(book)} className="text-blue-500 hover:underline mr-4 font-medium text-sm">Edit</button>
                    <button onClick={() => deleteBook(book.id)} className="text-red-500 hover:underline font-medium text-sm">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL FORM (TAMBAH / EDIT) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">{isEditMode ? 'Edit Data Buku' : 'Input Data Buku'}</h2>
                <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="text-gray-400 hover:text-black text-xl">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Judul Buku</label>
                  <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border focus:border-[#366650] outline-none" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Penulis</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Genre</label>
                  <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Harga</label>
                  <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Stok</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border" required />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Sinopsis</label>
                  <textarea value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border h-24" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    {isEditMode ? 'Ganti Cover Buku (Kosongkan jika tidak diubah)' : 'Cover Buku'}
                  </label>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border text-sm" accept="image/*" required={!isEditMode} />
                </div>
                
                <button type="submit" className="col-span-2 mt-4 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: '#366650' }}>
                  {isEditMode ? 'Simpan Perubahan' : 'Tambah Buku'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageBooks;