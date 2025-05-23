
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import { DashBoard } from './dashboard'
import Loginpage from './DummyLogin'


function App() {
  

  return (
    <>
      <Routes>
       <Route path="/" element={<DashBoard/>}/>
       <Route path="/login" element={<Loginpage/>} />
      </Routes>
    </>
  )
}

export default App
