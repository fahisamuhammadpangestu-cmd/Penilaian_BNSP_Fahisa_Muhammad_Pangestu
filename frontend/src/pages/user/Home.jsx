import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';

import InstagramLogo from '../../assets/Instagram.jpg';
import EmailLogo from '../../assets/email.webp';
import XLogo from '../../assets/x.webp';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#F0F9F4' }}>
      <UserNavbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#A3DFBF] flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#1A1F1E' }}>
              Selamat Datang di <span style={{ color: '#366650' }}>HisaStore.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">Temukan koleksi buku terbaik untuk menunjang wawasan Anda.</p>
            <button 
              onClick={() => navigate('/bookstore')}
              className="px-8 py-3 rounded-xl text-white font-bold bg-[#366650] hover:scale-105 transition-all"
            >
              Jelajahi Buku
            </button>
          </div>
          <div
            className="w-full md:w-1/3 h-64 rounded-2xl flex items-center justify-center text-4xl shadow-inner bg-cover bg-center"
            style={{ backgroundImage: "url('/book.jpg')" }}
            aria-label="Books background"
          ></div>
        </div>

        {/* Section About Us */}
        <section className="mt-20 mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#1A1F1E' }}>About Us</h2>

          <p className="text-gray-600 leading-relaxed">
            HisaStore adalah platform literasi modern yang didedikasikan untuk memudahkan akses buku berkualitas. 
            Kami percaya bahwa setiap buku memiliki pembacanya sendiri, dan kami hadir sebagai jembatan untuk itu.
            HisaStore hadir sebagai platform literasi modern untuk menghadirkan akses buku berkualitas dengan cara yang lebih cepat, rapi, dan
            mudah ditemukan. Kami percaya membaca adalah langkah kecil menuju perubahan besar—dan setiap pembaca pantas mendapatkan buku yang
            tepat.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white border border-[#A3DFBF]/80">
              <p className="font-bold" style={{ color: '#1A1F1E' }}>Kurasi Buku</p>
              <p className="text-sm text-gray-600">Pilihan bacaan yang relevan untuk berbagai kebutuhan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#A3DFBF]/80">
              <p className="font-bold" style={{ color: '#1A1F1E' }}>Akses Lebih Mudah</p>
              <p className="text-sm text-gray-600">Temukan buku favoritmu tanpa ribet.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#A3DFBF]/80">
              <p className="font-bold" style={{ color: '#1A1F1E' }}>Jembatan Pembaca</p>
              <p className="text-sm text-gray-600">Mempertemukan pembaca dengan bacaan yang pas.</p>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Visi */}
              <div className="flex-1 bg-white rounded-3xl p-6 border border-[#A3DFBF]/80 shadow-sm">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A1F1E' }}>Visi</h3>
                <ul className="text-left space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">1.</span>
                    <span>Menjadi platform literasi yang memudahkan akses buku berkualitas untuk semua orang.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">2.</span>
                    <span>Mendukung kebiasaan membaca sebagai gaya hidup yang berkelanjutan.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">3.</span>
                    <span>Menyediakan rekomendasi yang relevan sesuai kebutuhan dan minat pembaca.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">4.</span>
                    <span>Memperluas literasi digital agar pengetahuan lebih mudah dijangkau.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">5.</span>
                    <span>Menjadi jembatan antara pembaca dan bacaan yang tepat.</span>
                  </li>
                </ul>
              </div>

              {/* Misi */}
              <div className="flex-1 bg-white rounded-3xl p-6 border border-[#A3DFBF]/80 shadow-sm">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A1F1E' }}>Misi</h3>
                <ul className="text-left space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">1.</span>
                    <span>Menyediakan kurasi buku dari berbagai genre dengan kualitas yang terjaga.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">2.</span>
                    <span>Memudahkan pencarian buku melalui fitur katalog, filter, dan detail informasi.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">3.</span>
                    <span>Menghadirkan pengalaman belanja/akses yang cepat, jelas, dan nyaman.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">4.</span>
                    <span>Mendorong interaksi pembaca melalui konten literasi dan pembaruan koleksi.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#366650] font-bold">5.</span>
                    <span>Menjaga transparansi informasi buku agar pembaca memilih dengan yakin.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sosial Media*/}
          <div className="mt-12">
            <p className="text-gray-600 mb-6 font-medium">Ikuti kami:</p>

            <div className="flex flex-wrap justify-center gap-12">
              {/* Instagram */}
              <a
                href="https://instagram.com/dummyusername"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-2 min-w-[130px]"
              >
                <img
                  src={InstagramLogo}
                  alt="Instagram"
                  className="w-10 h-10 object-contain rounded-xl shadow-sm"
                />
                <span className="font-bold text-[#1A1F1E] group-hover:text-[#366650] transition-colors">
                  fhisa_
                </span>
              </a>

              {/* X */}
              <a
                href="https://x.com/dummyusername"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-2 min-w-[130px]"
              >
                <img
                  src={XLogo}
                  alt="X"
                  className="w-10 h-10 object-contain rounded-xl shadow-sm"
                />
                <span className="font-bold text-[#1A1F1E] group-hover:text-[#366650] transition-colors">
                  x
                </span>
              </a>

              {/* Email*/}
              <a
                href="mailto:fahisamuhammadpangestu@gmail.com"
                className="group flex flex-col items-center gap-2 min-w-[160px]"
              >
                <img
                  src={EmailLogo}
                  alt="Email"
                  className="w-10 h-10 object-contain rounded-xl shadow-sm"
                />
                <span className="font-bold text-[#1A1F1E] group-hover:text-[#366650] transition-colors text-sm">
                  fahisaMuhammad@gmail.com
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;