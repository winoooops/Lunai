import Nav from "../../ui/Nav";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatNavButtonGroup from "./ChatNavButtonGroup";
import ChatNavTitle from "./ChatNavTitle";

const ChatNav: React.FC<{}> = ({}) => {
  const { leftSidebar } = useSidebar();

  const isWidthFixed = leftSidebar ? leftSidebar?.isCollapsed : true;

  return (
    <Nav>
      <ChatNavTitle /> 
      <ChatNavButtonGroup isWidthFixed={isWidthFixed} />
    </Nav>
  )
}

export default ChatNav;