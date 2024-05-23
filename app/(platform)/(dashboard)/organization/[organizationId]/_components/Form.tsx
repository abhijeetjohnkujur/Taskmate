"use client"

import { createBoard } from "@/actions/create-board";
import {FormInput} from "@/components/ui/form/FormInput"
import { useAction } from "@/hooks/use-action";
import FormSubmit from "@/components/ui/form/FormSubmit";


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
                <FormInput id="title" errors={fieldErrors} label="Board title"/>
                </div>
                <FormSubmit>Save</FormSubmit>
    </form>
  )
}

export default Form;