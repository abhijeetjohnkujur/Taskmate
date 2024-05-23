import { db } from "@/lib/db"
import Board from "./_components/Board"
import Form from "./_components/Form"

const organizationIdpage = async() => {

    const boards = await db.board.findMany()

    return (
        <div className="flex flex-col space-y-4">
            <Form />
            <div className="space-y-2">
                {
                    boards.map((board) => (
                        <Board key={board.id} title={board.title} id={board.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default organizationIdpage