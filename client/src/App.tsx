import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Chat from './features/Chat/Chat'
import Layout from './ui/Layout'
import { UIContextProvider } from './contexts/UIContext'
import { DnDContextProvider } from './contexts/DnDContext'

function App() {
  return (
    <UIContextProvider>
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
    </UIContextProvider>
  )
}

export default App
