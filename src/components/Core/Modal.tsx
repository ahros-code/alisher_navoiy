import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";


const Modal = ({ children, button, title }: Readonly<{ children: React.ReactNode, button: React.ReactNode, title: string }>) => {

    return (
        <Dialog >
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="md:w-[80vw] w-[95vw]" >
                <DialogHeader >
                    <DialogTitle className="text-center text-xl font-semibold">{title}</DialogTitle>
                    <DialogDescription>
                        {children}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Modal;