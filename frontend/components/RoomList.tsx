"use client";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RoomList({ rooms }: {
    rooms: any
}) {
    const [roomType, setRoomType] = useState("all")
    const [filteredRooms, setFilteredRooms] = useState([])
    useEffect(() => {
        const filtered = rooms.data?.filter((room: any) => {
            return roomType === 'all' ? rooms : roomType === room.attributes.type;
        });
        setFilteredRooms(filtered)
    }, [roomType, rooms])

    return (
        <section className="py-16 min-h-[90vh]">
            {/*image and title*/}
            <div className="flex flex-col items-center">
                {/*image*/}
                <div className="relative w-20 h-20">
                    <Image src="/booking-high-resolution-logo.png" fill alt="hero image" className="object-cover" />
                </div>
                {/*title*/}
                <h2 className="text-3xl font-bold mb-8">Our Rooms</h2>
            </div>

            {/*Tabs*/}
            <Tabs defaultValue="all" className="w-[240px] lg:w-[540px] h-[200px] lg:h-auto mb-8 mx-auto">
                <TabsList className="w-full h-full lg:h-[46px] flex flex-col lg:flex-row">
                    <TabsTrigger value="all" className="w-full h-full" onClick={() => setRoomType("all")}>All</TabsTrigger>
                    <TabsTrigger value="single" className="w-full h-full" onClick={() => setRoomType("single")}>Single</TabsTrigger>
                    <TabsTrigger value="double" className="w-full h-full" onClick={() => setRoomType("double")}>Double</TabsTrigger>
                    <TabsTrigger value="extended" className="w-full h-full" onClick={() => setRoomType("extended")}>Extended</TabsTrigger>
                </TabsList>
            </Tabs>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRooms.map((room: any) => {
                    const imgURL = `http://127.0.0.1:1337${room.attributes.image.data
                        ?.attributes.url}`
                    return (
                        <div key={room.id}>
                            <Link href={`/room/${room.id}`}>
                                <div className="relative h-[300px] w-full overflow-hidden mb-6">
                                    <Image
                                        src={imgURL}
                                        fill
                                        priority
                                        alt={`${room.attributes.title}`}
                                        className="object-cover" />
                                </div>
                            </Link>
                            <div className="h-[134px] truncate">
                                <div className="flex items-center justify-between mb-6">
                                    <div>Capacity - {room.attributes.capacity} Person</div>
                                    <div className="flex gap-1 text-orange-500">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                                    </div>
                                </div>
                                <Link href={`/room/${room.id}`}>
                                    <h4 className="text-lg font-bold">{room.attributes.title}</h4>
                                </Link>
                                <p className="text-base text-gray-500">$<span className="text-orange-500">{room.attributes.price}</span><span className="text-gray-500 text-[10px]">/ Night</span></p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}