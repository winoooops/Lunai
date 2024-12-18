import { useConfigContext } from "@/contexts/ConfigContext";
import { ReactNode } from "react"

const MessageSidebarWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeModel } = useConfigContext();

  return (
    <div className="h-full flex-1 shadow-lg border-0.5 p-4 text-slate-200">
      <div className="h-full flex flex-col">
        <div className="control-title">
          <h1>Chat controls</h1>
          <h2>{activeModel?.name}</h2>
        </div>
        <div className="control-content">
          {children} 
        </div>
      </div>
    </div>
  )
}

export default MessageSidebarWrapper;