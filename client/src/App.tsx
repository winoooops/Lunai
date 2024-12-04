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
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ChatContextProvider } from './contexts/ChatContext'


const client = new ApolloClient(
  {
    uri: import.meta.env.VITE_BASE_URL || "localhost:4000",
    cache: new InMemoryCache()
  }
)



function App() {
  return (
    <ApolloProvider client={client}>
    <SpinnerProvider>
    <DialogProvider>  
    <SidebarProvider>
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
    </SidebarProvider>
    </DialogProvider>
    </SpinnerProvider>
    </ApolloProvider>
  )
}

export default App
