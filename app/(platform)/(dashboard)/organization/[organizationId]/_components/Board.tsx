import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import Formdeletebutton from "./Formdeletebutton";

interface BoardProps {
    title: string;
    id: string;
}

const Board = ({
    title,
    id
}: BoardProps) => {

    const deleteboardWithId = deleteBoard.bind(null,id)

  return (
    <form className="flex items-center gap-x-2" action={deleteboardWithId}>
        <p>
            Board Title: {title}
        </p>
        <Formdeletebutton />
    </form>
  )
}

export default Board;