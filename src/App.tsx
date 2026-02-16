import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home'
import { EventsPage } from './pages/EventsPage'
import { EventsDetail } from './pages/EventsDetail'
import { LocationsPage } from './pages/LocationsPage'
import { LocationsDetail } from './pages/LocationsDetail'

function App() {

  return(
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:id' element={<EventsDetail/>} />
        <Route path='/locations' element={<LocationsPage />} />
        <Route path='/locations/:id' element={<LocationsDetail />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
