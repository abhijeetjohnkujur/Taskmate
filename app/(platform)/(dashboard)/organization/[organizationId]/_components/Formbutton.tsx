"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const Formbutton = () => {
    const { pending } = useFormStatus()
  return (
    <>
    <Button type="submit" disabled={pending}>Submit</Button>
    </>
  )
}

export default Formbutton;