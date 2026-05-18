import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Tambah loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        
        if (response.data.role === 'admin') {
            navigate('/admin/overview');
        } else {
            navigate('/home');
        }
        } catch (error) {
            alert('Login Gagal!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#A3DFBF' }}>
            <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 transform hover:scale-105 border border-[#4F9B7E]">
                <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1A1F1E' }}>Login Hisa Store</h2>
                <input type="email" placeholder="Email" className="w-full p-3 mb-5 border rounded-lg focus:ring-2" 
                       style={{ borderColor: '#4F9B7E', focusRingColor: '#4F9B7E' }}
                       onChange={(e) => setEmail(e.target.value)} required />
                
                <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg focus:ring-2" 
                       style={{ borderColor: '#4F9B7E', focusRingColor: '#4F9B7E' }}
                       onChange={(e) => setPassword(e.target.value)} required />
                
                <button type="submit" disabled={isLoading} className="w-full p-3 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none" 
                        style={{ backgroundColor: isLoading ? '#1A1F1E' : '#366650', hoverBackgroundColor: '#1A1F1E' }}>
                    {isLoading ? 'Sedang Masuk...' : 'Masuk'}
                </button>
                
                <p className="mt-6 text-center text-gray-700">Belum punya akun? 
                    <Link to="/register" className="font-semibold ml-1" style={{ color: '#4F9B7E' }}>Daftar</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;