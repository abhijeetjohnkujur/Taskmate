"use client";

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import { FormInput } from "./FormInput";
import FormSubmit from "./FormSubmit";
import { Button } from "../button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Formpicker } from "./Formpicker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number
}

const Formpopover = ({
    children,
    side="bottom",
    align,
    sideOffset = 0
}: FormPopoverProps) => {

    const router = useRouter()
    const proModal = useProModal()
    const closeRef = useRef<ElementRef<"button">>(null)
    const {execute,fieldErrors} = useAction(createBoard,{
        onSuccess: (data) => {
            toast.success("Board created successfully")
            closeRef.current?.click();
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error(error);
            proModal.onOpen();
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;


        execute({ title, image })
      
    }

  return (
    <Popover>  
        <PopoverTrigger asChild>
            {children}
        </PopoverTrigger>
        <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
        >
            <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                Create board
            </div>
        <PopoverClose asChild className="border-none" ref={closeRef}>
            <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 border-none outline-none"
            variant={"ghost"}
            >
                <X className="h-4 w-4" />
            </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
            <Formpicker
                id="image"
                errors={fieldErrors}
            />
            <div className="space-y-4">
                <FormInput
                id="title"
                label="Board title"
                type="text"
                errors={fieldErrors}
                />
            </div>
            <FormSubmit className="w-full">
                Create
            </FormSubmit>
        </form>
        </PopoverContent>
    </Popover>
  )
}

export default Formpopover;