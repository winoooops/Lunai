import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Chat from './pages/Chat'
import Layout from './ui/Layout'
import { UIContextProvider } from './contexts/UIContext'
import { DnDContextProvider } from './contexts/DnDContext'
import { DialogProvider } from './contexts/DialogContext'

function App() {
  return (
    <UIContextProvider>
    <DialogProvider>  
    <DnDContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Layout>
      </Router>  
    </DnDContextProvider>  
    </DialogProvider>
    </UIContextProvider>
  )
}

export default App
