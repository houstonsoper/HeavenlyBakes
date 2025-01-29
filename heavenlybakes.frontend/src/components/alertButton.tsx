import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"

interface AlertProps {
    buttonIcon? : string
    className? : string 
    title: string,
    description: string,
    action: () => void,
    cancelText? : string,
    continueText? : string,
}
export default function Alert({buttonIcon, title, description, action, className, cancelText, continueText}: AlertProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={className}>
                    <span className="material-symbols-outlined">{buttonIcon}</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText ?? "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction className="bg-pink-700 hover:bg-pink-800" onClick={action}>
                        {continueText ?? "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}