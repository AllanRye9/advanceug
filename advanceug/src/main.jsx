import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import './index.css'
import Content from './components/content/content.jsx'
import Footer from './components/footer/footer.jsx'
import NavBar from './components/navbar/navbar.jsx'
import Search from './components/search/search.jsx'
import OrganizeContent from './components/arrangeLevels/arrangeLevels.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Search />
      <Content />
      <OrganizeContent />
      <Footer />
    </BrowserRouter>
  </StrictMode>
)
