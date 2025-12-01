import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DetailPage from './pages/DetailPage';
import SellPage from './pages/SellPage';
import ProfilePage from './pages/ProfilePage';
import EditPage from './pages/EditPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Components
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

// Komponen Layout Terpisah agar bisa pakai useLocation
function MainLayout() {
  const location = useLocation();
  
  // Daftar halaman yang TIDAK perlu Sidebar/Navigasi
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    // UBAH DISINI: Background jadi putih (bg-white)
    <div className="app-container font-sans text-black min-h-screen bg-white flex flex-col md:flex-row">
      
      <Toaster position="top-center" toastOptions={{ style: { background: '#000', color: '#fff', border: '1px solid #333' } }}/>

      {/* Hanya tampilkan Sidebar jika BUKAN halaman Auth */}
      {!isAuthPage && <Sidebar />}

      {/* KONTEN UTAMA */}
      {/* Logika Class: Jika Auth Page, hapus margin kiri (md:ml-64) agar full screen */}
      <div className={`flex-1 w-full min-h-screen transition-all duration-300 relative z-0 ${!isAuthPage ? 'md:ml-64 pb-20 md:pb-0' : ''}`}>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/jual" element={<SellPage />} />
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/account/:id" element={<DetailPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </div>
      
      {/* Hanya tampilkan BottomNav jika BUKAN halaman Auth */}
      {!isAuthPage && <BottomNav />}
      
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;