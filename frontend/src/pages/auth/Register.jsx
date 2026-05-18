import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Tambah loading state
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/register', { nama, email, password });
            alert('Registrasi Berhasil! Silahkan Login.');
            navigate('/');
        } catch (error) {
            alert('Registrasi Gagal: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#A3DFBF' }}>
            <form onSubmit={handleRegister} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 transform hover:scale-105 border border-[#4F9B7E]">
                <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1A1F1E' }}>Daftar Akun</h2>
                
                <input type="text" placeholder="Nama Lengkap" className="w-full p-3 mb-5 border rounded-lg focus:ring-2" 
                       style={{ borderColor: '#4F9B7E', focusRingColor: '#4F9B7E' }}
                       onChange={(e) => setNama(e.target.value)} required />
                
                <input type="email" placeholder="Email" className="w-full p-3 mb-5 border rounded-lg focus:ring-2" 
                       style={{ borderColor: '#4F9B7E', focusRingColor: '#4F9B7E' }}
                       onChange={(e) => setEmail(e.target.value)} required />
                
                <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg focus:ring-2" 
                       style={{ borderColor: '#4F9B7E', focusRingColor: '#4F9B7E' }}
                       onChange={(e) => setPassword(e.target.value)} required />
                
                <button type="submit" disabled={isLoading} className="w-full p-3 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none" 
                        style={{ backgroundColor: isLoading ? '#1A1F1E' : '#366650', hoverBackgroundColor: '#1A1F1E' }}>
                    {isLoading ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
                </button>
                
                <p className="mt-6 text-center text-gray-700">Sudah punya akun? 
                    <Link to="/" className="font-semibold ml-1" style={{ color: '#4F9B7E' }}>Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;