import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingBubble from './components/FloatingBubble'
import CustomCursor from './components/CustomCursor'
import AppRoutes from './routes/AppRoutes'
import './styles/main.css'

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <FloatingBubble />
      <Footer />
    </BrowserRouter>
  )
}

export default App
