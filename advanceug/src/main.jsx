import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import './index.css'
import Content from './components/content/content.jsx'
import Footer from './components/footer/footer.jsx'
import NavBar from './components/navbar/navbar.jsx'
import Search from './components/search/search.jsx'
import OrganizeContent from './components/arrangeLevels/arrangeLevels.jsx'
import Uace from './components/pages/uace/uace.jsx'
import NoPage from './components/pages/noPage/noPage.jsx'
import About from './components/pages/about/about.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar />
    <Search />
    <Content />
        <Routes>
          <Route path='/' element={<OrganizeContent />} />
          <Route path="/uace" element={<Uace />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      <Footer />
      </BrowserRouter>
  </StrictMode>
)
