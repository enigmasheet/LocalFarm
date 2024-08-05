import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import GHdetail from './pages/GHdetail';
import { AuthProvider } from './AuthContext';
import Layout from './components/LayOut';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
     
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<GHdetail />} />
          </Routes>
        </Layout>
     
    </AuthProvider>
  );
}

export default App;
