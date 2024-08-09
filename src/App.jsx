import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import GHdetail from './pages/GHdetail';
import { AuthProvider } from './AuthContext';
import Layout from './components/LayOut';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import FAQ from './pages/FAQ';

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<GHdetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
