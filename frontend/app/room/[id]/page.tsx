import Image from "next/image";
import Reservations from "@/components/Reservations";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TbArrowsMaximize, TbUsers } from "react-icons/tb";
const getRoomData = async ({ params }: { paramas: any }) => {
    const response = await fetch(`http://127.0.0.1:1337/api/rooms/${params.id}?populate=*`, {
        next: {
            revalidate: 0
        }
    });
    return await response.json();
}
const getReservationsData = async () => {
    const response = await fetch(`http://127.0.0.1:1337/api/reservations?populate=*`, {
        next: {
            revalidate: 0
        }
    });
    return await response.json();
}

export default async function RoomDetails({ params }: { paramas: any }) {
    const rooms = await getRoomData({ params });
    const reservations = await getReservationsData();
    const {isAuthenticated, getUser} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const userData = await getUser();
    const imgURL = `http://127.0.0.1:1337${rooms.data?.attributes.image.data.attributes.url}`;
    return <section className="min-h-[80vh]">
        <div className="container mx-auto py-8">
            <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
                { /*image, text and title*/}
                <div className="flex-1">
                    {/*image */}
                    <div className="relative h-[360px] lg:h-[420px] mb-8">
                        <Image src={imgURL} fill alt="hero image" className="object-cover" />
                    </div>
                    {/*text and title*/}
                    <div className="flex flex-1 flex-col mb-8">
                        {/* title*/}
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold">{rooms.data?.attributes.title}</h4>
                            <p className="text-base text-gray-500">$<span className="text-orange-500">{rooms.data?.attributes.price}</span><span className="text-gray-500 text-[10px]">/ Night</span></p>
                        </div>
                        {/*text*/}
                        <div className="flex items-center gap-8 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl text-orange-500">
                                    <TbArrowsMaximize />
                                </div>
                                <p className="text-gray-500">{rooms.data?.attributes.size} m <sup>2</sup></p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-2xl text-orange-500">
                                    <TbUsers />
                                </div>
                                <p className="text-gray-500">{rooms.data?.attributes.capacity} Guests</p>
                            </div>
                        </div>
                        <p>{rooms.data?.attributes.description}</p>
                    </div>
                </div>
                { /*reservation*/}
                <div className="w-full lg:max-w-[360px] h-max">
                    <Reservations
                        reservations={reservations}
                        room={rooms}
                        isAuthenticated={isUserAuthenticated}
                        userData={userData} />
                </div>
            </div>
        </div>
    </section>;
}