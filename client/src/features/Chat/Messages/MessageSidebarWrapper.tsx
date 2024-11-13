import { ReactNode } from "react"

const MessageSidebarWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="h-full flex-1 shadow-lg border-0.5 p-4 text-slate-200">
      <div className="h-full flex flex-col">
        <div className="control-title">
          <h1>Chat controls</h1>
          <p>Display model information here</p>
        </div>
        <div className="control-content">
          <h2>Content</h2>
          {children} 
        </div>
      </div>
    </div>
  )
}

export default MessageSidebarWrapper;