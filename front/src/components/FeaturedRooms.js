import React, { useContext, useState, useEffect } from "react";
import Title from "./Title";
import { RoomContext } from "../contex";
import Room from "./Room";
import SkeletonRoom from "./SkeletonRoom"

export default function FeaturedRooms()  {
  const context = useContext(RoomContext);
  const [loading, setLoading] = useState(true);
  let { featuredRooms: rooms } = context;
  
useEffect(() => {
  setTimeout(()=>{
    setLoading(false)
  },1000)
}, [])

  rooms = rooms.map(room => {
    return  loading? <SkeletonRoom/> : <Room key={room.id} room={room} />;
  });
  
  return (
  <section className="featured-rooms">
    <Title title="featured rooms" />
    <div className="featured-rooms-center">
      {rooms} 
      </div>
      </section>
      );
}