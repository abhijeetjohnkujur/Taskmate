"use client";

import { create } from "@/actions/create-board";
import { useFormState } from "react-dom";
import FormInput from "./FormInput";
import Formbutton from "./Formbutton";

const Form = () => {

    const initialState = {message: null, errors: {}}
    const [state,dispatch] = useFormState(create,initialState)

  return (
    <form action={dispatch}>
                <div className="flex flex-col space-y-2">
                <FormInput errors={state?.errors} />
                </div>
                <Formbutton />
            </form>
  )
}

export default Form;