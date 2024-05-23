"use client"

import { createBoard } from "@/actions/create-board";
import FormInput from "./FormInput";
import Formbutton from "./Formbutton";
import { useAction } from "@/hooks/use-action";

const Form = () => {

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data,"SUCCESS")
    },
    onError: (data) => {
      console.log(data,"ERROR")
    },
    
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({title})
  }

  return (
    <form action={onSubmit}>
                <div className="flex flex-col space-y-2">
                <FormInput errors={fieldErrors} />
                </div>
                <Formbutton />
    </form>
  )
}

export default Form;