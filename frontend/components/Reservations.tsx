'use client'
import { useState, useEffect } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar"
import { format, isPast } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from "next/navigation";

const postData = async (url: string, data: object) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default function Reservations({ reservations, room, userData, isAuthenticated }: {
    reservations: any;
    room: any;
    userData: any;
    isAuthenticated: boolean;
}) {
    const [checkInDate, setCheckInDate] = useState<Date>()
    const [checkOutDate, setCheckOutDate] = useState<Date>()
    const [alert, setAlert] = useState<{
        message: string;
        type: "success" | "error" | null;
    } | null>(null)

    const router = useRouter();

    const dateFormatter = (date: Date) => {
        // Save reservation to Strapi
        return format(date, 'yyyy-MM-dd')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            return setAlert(null)
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [alert])


    const saveReservations = () => {
        if (!checkInDate || !checkOutDate) {
            return setAlert({
                message: "Please select check-in and check-out dates",
                type: "error"
            })
        }
        if (checkInDate.getTime() === checkOutDate.getTime()) {
            return setAlert({
                message: "Check In and Check Out dates cannot be the same",
                type: "error"
            })
        }
        if (checkInDate && checkOutDate && checkInDate.getTime() > checkOutDate.getTime()) {
            return setAlert({
                message: "Check In date cannot be greater than Check Out date",
                type: "error"
            })
        }
        const isReserved = reservations.data.filter(
            (reservation: any) => {
                return (reservation.attributes.room.data.id === room.data.id)
            }
        ).some((reservation: any) => {
            const oldCheckIn = new Date(reservation.attributes.checkin).setHours(0, 0, 0, 0)
            const oldCheckOut = new Date(reservation.attributes.checkout).setHours(0, 0, 0, 0)
            const newCheckIn = checkInDate.setHours(0, 0, 0, 0)
            const newCheckOut = checkOutDate.setHours(0, 0, 0, 0)
            const reserved =
                (newCheckIn >= oldCheckIn && newCheckIn < oldCheckOut)     //
                || (newCheckOut > oldCheckIn && newCheckOut <= oldCheckOut)   //
                || (oldCheckIn > newCheckIn && oldCheckIn < newCheckOut)      //
                || (oldCheckOut > newCheckIn && oldCheckOut < newCheckOut)    //
            return reserved
        })

        if (isReserved) {
            return setAlert({
                message: "Room is already reserved",
                type: "error"
            })
        } else {
            const data = {
                data: {
                    firstname: userData.given_name,
                    lastname: userData.family_name,
                    email: userData.email,
                    checkin: checkInDate ? dateFormatter(checkInDate) : null,
                    checkout: checkOutDate ? dateFormatter(checkOutDate) : null,
                    room: room.data.id
                }
            }

            postData("http://127.0.0.1:1337/api/reservations", data)
            setAlert({
                message: "Reservation saved",
                type: "success"
            })
            router.refresh();
        }
    }


    return (
        <div>
            <div className="bg-orange-50 h-[320px] mb-4">
                <div className="text-white bg-orange-500 relative py-4 text-center">
                    <h4 className="text-2xl">Make a reservation</h4>
                    <div className="text-orange-500 text-2xl absolute top-14 left-[calc(50%_-_10px)] rotate-90"><MdPlayArrow /></div>
                </div>
                <div className="flex flex-col gap-4 w-full py-8 px-6">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full flex justify-start text-left font-normal",
                                    !checkInDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? format(checkInDate, "PPP") : <span>check In</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkInDate}
                                onSelect={setCheckInDate}
                                initialFocus
                                disabled={isPast}
                            />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !checkOutDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? format(checkOutDate, "PPP") : <span>check Out</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkOutDate}
                                onSelect={setCheckOutDate}
                                initialFocus
                                disabled={isPast}
                            />
                        </PopoverContent>
                    </Popover>
                    {isAuthenticated ? <Button onClick={() => saveReservations()}>Reserve Now</Button> :
                        <LoginLink><Button className="w-full">Reserve Now</Button> </LoginLink>}
                </div>
            </div>
            {
                alert && <div className="text-center text-red-500">
                    <Alert className={`rounded-none ${alert.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            {alert.message}
                        </AlertDescription>
                    </Alert>
                </div>
            }
        </div>
    )
}