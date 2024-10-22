import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './ui/Layout'
import { UIContextProvider } from './contexts/UIContext'
import { DnDContextProvider } from './contexts/DnDContext'
import { DialogProvider } from './contexts/DialogContext'
import ChatDetailsPage from './pages/Chat/ChatDetailsPage'
import ChatNewPage from './pages/Chat/ChatNewPage'
import ChatLayout from './pages/Chat/ChatLayout'
import { ChatContextProvider } from './contexts/ChatContext'

function App() {
  return (
    <UIContextProvider>
    <DialogProvider>  
    <DnDContextProvider>
    <ChatContextProvider>  
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatLayout/>}>
              <Route index element={<Navigate to="new" replace />} />
              <Route path="new" element={<ChatNewPage/>} /> 
              <Route path=":chatId" element={<ChatDetailsPage/>} />
            </Route>
          </Routes>
        </Layout>
      </Router>  
    </ChatContextProvider>
    </DnDContextProvider>  
    </DialogProvider>
    </UIContextProvider>
  )
}

export default App
