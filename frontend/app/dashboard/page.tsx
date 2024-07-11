import Link from "next/link"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import Cancel from "@/components/Cancel"

const getUserReservations = async (userEmail: any) => {
    const response = await fetch(`http://127.0.0.1:1337/api/reservations?[filters][email][$eg]=${userEmail}&populate=*`, {
        next: {
            revalidate: 0
        }
    })

    return await response.json()
}


import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function Dashboard() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const userReservations = await getUserReservations(user?.email)
    console.log(userReservations.data)
    return (
        <section className="min-h-[80vh]">
            <div className="container mx-auto py-8">
                <h3 className="text-center text-xl font-semibold lg:text-left">Hello, {user?.given_name} {user?.family_name}, you have <span className={`${userReservations?.data?.length === 0 ? "text-red-500" : "text-green-500"}`}>{userReservations?.data?.length}</span> {userReservations?.data?.length === 1 ? "reservation" : "reservations"}</h3>
                <div className="flex flex-col gap-4 mt-8">
                    {
                        userReservations?.data?.length >= 1 ? <div>
                            {
                                userReservations?.data?.map((reservation: any) => {
                                    return (
                                        <div key={reservation.id} className="flex flex-col gap-4 bg-orange-50 p-4 mb-8 text-center lg:text-left">
                                            <div>
                                                <h4 className="text-lg font-bold">{reservation.attributes?.room.data.attributes.title}</h4>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <p><span className="text-orange-500">Check In:</span> {format(reservation.attributes?.checkin, 'PPP')} <br /> <span className="text-orange-500">Check Out:</span> {format(reservation.attributes?.checkout, 'PPP')}</p>
                                                <p><span className="text-orange-500">Reserved:</span> {reservation.attributes?.createdAt.slice(0, 10)}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                                <Link href={`/room/${reservation.attributes?.room.data.id}`} className="text-orange-500" target="_blank"><Button>View Room</Button></Link>
                                                <Cancel reservation={reservation}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> : <div className="py-36 flex flex-col items-center justify-center">
                            <h3 className="text-center text-3xl text-red-300">You have no reservations</h3>
                            <Link href="/"><Button className="mt-8">Book Now</Button></Link>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}