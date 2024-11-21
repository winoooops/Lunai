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
import { SidebarProvider } from './contexts/SidebarContext'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient(
  {
    uri: "https://45.32.66.110:4000",
    cache: new InMemoryCache()
  }
)



function App() {
  return (
    <ApolloProvider client={client}>
    <UIContextProvider>
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
    </UIContextProvider>
    </ApolloProvider>
  )
}

export default App
