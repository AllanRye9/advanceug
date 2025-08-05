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
import Agric from './components/pages/uaceSubjects/agric/agric.jsx'
import AgricContent from './components/pages/uaceSubjects/agric/agricContent.jsx'
import AgricContent2 from './components/pages/uaceSubjects/agric/agricContent2.jsx'
import AgricContent3 from './components/pages/uaceSubjects/agric/agricContent3.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar />
    <Search />
        <Routes>
          <Route path='/' element={ <><Content /> <OrganizeContent /> </>} />
          <Route path="/uace" element={<Uace />} />
          <Route path="/about" element={ <><Content /> <About /> </>} />
          <Route path="/agricContent" element={<AgricContent />} />
          <Route path="/agricContent2" element={<AgricContent2 />} />
          <Route path="/agricContent3" element={<AgricContent3 />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      <Footer />
      </BrowserRouter>
  </StrictMode>
)
