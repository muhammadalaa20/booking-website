'use client'
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

const deleteData= async (url: string) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default function Cancel( {reservation}: {reservation : any} ) {
    const router = useRouter()
    const cancelReservation = (id: number) => {
        deleteData(`http://127.0.0.1:1337/api/reservations/${id}`)
        router.refresh()
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="text-white bg-red-500 px-3 hover:bg-red-400 transition-all ease-in-out duration-300">Cancel</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete your reservation.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => cancelReservation(reservation.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}