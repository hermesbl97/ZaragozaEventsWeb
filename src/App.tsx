import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home'
import { EventsPage } from './pages/EventsPage'
import { EventsDetail } from './pages/EventsDetail'

function App() {

  return(
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:id' element={<EventsDetail/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
