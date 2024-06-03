"use client";

import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/ui/form/FormSubmit";
import Formtextarea from "@/components/ui/form/Formtextarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
    data: CardWithList
}


export const Description = ({
    data
}: DescriptionProps) => {

    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const textAreaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }


    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const {execute,fieldErrors} = useAction(updateCard,{
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            })
            toast.success(`Card "${data.title}" updated`)
            disableEditing();
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        // execute
        execute({
            id: data.id,
            description,
            boardId
        })
        
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {
                    isEditing ? (
                        <form
                        ref={formRef}
                        className="space-y-2"
                        action={onSubmit}
                        >
                            <Formtextarea 
                            id="description"
                            className="w-full mt-2"
                            placeholder="Add a more detailed description"
                            defaultValue={data.description || undefined}
                            errors={fieldErrors}
                            ref={textAreaRef}
                            />
                            <div className="flex items-center gap-x-2">
                                <FormSubmit>
                                    Save
                                </FormSubmit>
                                <Button type="button" onClick={disableEditing} size="sm" variant="ghost">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )
                        :
                        (<div role="button" className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                        onClick={enableEditing}
                        >
                            {data.description || "Add a more detailed description..."}
                        </div>
                )}
            </div>
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className=" w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className=" w-full h-[78px] bg-neutral-200" />
            </div>
        </div>
    )
}