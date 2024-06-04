"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import hero from "@/public/hero.svg";
import { Button } from "@/components/ui/button";

export const Promodal = () => {
    const proModal = useProModal();
    return (
        <Dialog
        open={proModal.isOpen}
        onOpenChange={proModal.onClose}
        >
        <DialogContent className="max-w-md p-0 overflow-hidden">
            <div className="aspect-video relative flex items-center justify-center">
                <Image 
                src={hero}
                alt="Hero"
                className="object-fill"
                fill
                />
            </div>
            <div className="text-neutral-700 mx-auto space-y-6 p-6">
                <h2 className="font-semibold text-xl">
                    Upgrade to Taskmate Pro Today!
                </h2>
                <p className="text-xs font-semibold text-neutral-600">
                    Explore the brst of Taskmate
                </p>
                <div className="pl-3">
                    <ul className="text-sm list-disc">
                        <li>Unlimited boards</li>
                        <li>Advanced checklists</li>
                        <li>Admin and security features</li>
                        <li>And more!</li>
                    </ul>
                </div>
                <Button 
                className="w-full"
                variant={"default"}
                >
                    Upgrade
                </Button>
            </div>
        </DialogContent>
        </Dialog>
    )
}