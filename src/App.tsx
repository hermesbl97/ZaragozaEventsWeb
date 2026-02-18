import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home'
import { EventsPage } from './pages/EventsPage'
import { EventsDetail } from './pages/EventsDetail'
import { LocationsPage } from './pages/LocationsPage'
import { LocationsDetail } from './pages/LocationsDetail'
import { ThemeProvider } from './components/ThemeContext'
import { ArtistsPage } from './pages/ArtistsPage'
import { ArtistsDetail } from './pages/ArtistsDetail'

function App() {

  return(
    <>
      <ThemeProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:id' element={<EventsDetail/>} />
        <Route path='/locations' element={<LocationsPage />} />
        <Route path='/locations/:id' element={<LocationsDetail />} />
        <Route path='/artists' element={<ArtistsPage />} />
        <Route path='/artists/:id' element={<ArtistsDetail />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
