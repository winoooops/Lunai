import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Chat from './features/Chat/Chat'
import Layout from './ui/Layout'
import { UIContextProvider } from './contexts/UIContext'

function App() {
  return (
    <UIContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Layout>
      </Router>  
    </UIContextProvider>
  )
}

export default App
