'use client'
import { useState, useEffect } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar"
import { format, isPast } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Reservations({ reservations, room, userData, isAuthenticated }: {
    reservations: any;
    room: any;
    userData: any;
    isAuthenticated: boolean;
}) {
    const [checkInDate, setCheckInDate] = useState<Date>()
    const [checkOutDate, setCheckOutDate] = useState<Date>()
    const saveReservations = () => {
        if (!checkInDate || !checkOutDate) {
            console.log("Please select check in and check out dates")
        }
    }

    console.log(room)
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
        </div>
    )
}