import RoomList from './RoomList';
//Getting the rooms
const getRooms = async() => {
    const response = await fetch('http://127.0.0.1:1337/api/rooms?populate=*', {
        next: {
            revalidate: 0
        }
    });
    return await response.json();
}
//Displaying the rooms
const Rooms = async() => {
    const rooms = await getRooms();
    return (
        <section>
            <div className="container mx-auto">
                <RoomList rooms={rooms}/>
            </div>
        </section>
    );
}

export default Rooms;