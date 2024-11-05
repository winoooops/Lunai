import Nav from "../../ui/Nav";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatNavButtonGroup from "./ChatNavButtonGroup";
import ChatNavTitle from "./ChatNavTitle";

const ChatNav: React.FC<{}> = ({}) => {
  const { isCollapsed } = useSidebar();

  return (
    <Nav>
      <ChatNavTitle isWidthFixed={isCollapsed}/> 
      <ChatNavButtonGroup isWidthFixed={isCollapsed} />
    </Nav>
  )
}

export default ChatNav;