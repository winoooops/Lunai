import { RiAddLine } from "react-icons/ri";
import Button from "../ui/Button";
import Nav from "../ui/Nav";
import MenuButton from "./MenuButton";
import ChatHistoryButton from "../features/Chat/History/ChatHistoryButton";

const NavComponent: React.FC<{}> = ({}) => {
  return (
    <Nav>
      <MenuButton colorScheme={{ bg: "bg-slate-800", hover:"hover:text-yellow-300", text: "text-slate-200" }} />
      <Button colorScheme={{ bg:"bg-slate-800", hover:"hover:text-yellow-300", text:"text-slate-200" }}>
        <RiAddLine />
      </Button>
      <ChatHistoryButton colorScheme={{ bg:"bg-slate-800", hover:"hover:text-yellow-300", text:"text-slate-200" }} />
    </Nav>
  )
}

export default NavComponent;