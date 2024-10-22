import { Outlet } from "react-router-dom";
import NavComponent from "../../components/Nav.component";
import { MessageContextProvider } from "../../contexts/MessageContext";

const ChatLayout: React.FC<{}> = ({}) => {
  return (
    <MessageContextProvider>
      <NavComponent />
      <Outlet />
    </MessageContextProvider>
  );
}

export default ChatLayout;