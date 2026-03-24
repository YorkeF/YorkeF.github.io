import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
