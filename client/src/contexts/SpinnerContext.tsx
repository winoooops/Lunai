import { createContext, useContext, useState } from "react";
import { SyncLoader } from "react-spinners";

interface SpinnerContextType {
  isLoading: boolean;
  enableLoading: () => void;
  disableLoading: () => void;
}


const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const SpinnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const enableLoading = () => setIsLoading(true);
  const disableLoading = () => setIsLoading(false);
  
  return (
    <SpinnerContext.Provider value={{ isLoading, enableLoading, disableLoading }}>
      { isLoading && (
        <div className="spinner-overlay">
          <SyncLoader loading={isLoading} size={15} aria-label="Loading Spinner" data-testid="loader" /> 
        </div>
        ) 
      }
      {children}
    </SpinnerContext.Provider>
  )
};

export const useSpinnerContext = () => {
  const context = useContext(SpinnerContext);

  if(context === undefined) {
    throw new Error("useUIContext must be used within a UIContextProvider");
  }

  return context;
}