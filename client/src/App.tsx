import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './ui/Layout'
import { SpinnerProvider } from './contexts/SpinnerContext'
import { DnDContextProvider } from './contexts/DnDContext'
import { DialogProvider } from './contexts/DialogContext'
import ChatDetailsPage from './pages/Chat/ChatDetailsPage'
import ChatNewPage from './pages/Chat/ChatNewPage'
import ChatLayout from './pages/Chat/ChatLayout'
import { SidebarProvider } from './contexts/SidebarContext'
import { ChatContextProvider } from './contexts/ChatContext'
import { ConfigProvider } from './contexts/ConfigContext'

function App() {
  return (
    <SpinnerProvider>
    <DialogProvider>  
    <SidebarProvider>
    <DnDContextProvider>
    <ChatContextProvider>  
    <ConfigProvider>
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
    </ConfigProvider>
    </ChatContextProvider>  
    </DnDContextProvider>  
    </SidebarProvider>
    </DialogProvider>
    </SpinnerProvider>
  )
}

export default App
