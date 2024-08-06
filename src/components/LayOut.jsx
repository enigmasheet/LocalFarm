// src/components/LayOut.jsx
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
};

// Add prop types validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
