"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
    errors?: {
        title?: string[];
    }
}

const FormInput = ({errors}: FormInputProps) => {

    const { pending } = useFormStatus()

  return (
    <div>
                <Input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Enter a name for title"
                className="my-4 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                disabled={pending}
                />
                {errors?.title? (
                    <div>
                        {errors.title.map((error: string) => (
                            <p key={error} className="text-rose-500">
                                {error}
                            </p>
                        ))}
                    </div>
                ): null}
    </div>
  )
}

export default FormInput;