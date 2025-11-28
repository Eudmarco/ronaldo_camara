import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Legacy from './pages/Legacy';
import Store from './pages/Store';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import CartSidebar from './components/CartSidebar';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <CartSidebar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/legacy" element={<Legacy />} />
              <Route path="/store" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;