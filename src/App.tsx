import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home'
import { EventsPage } from './pages/EventsPage'

function App() {

  return(
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<EventsPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
