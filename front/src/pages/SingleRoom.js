import React, { useState, useContext, useEffect } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../contex";
import StyledHero from "../components/StyledHero";
import {ImMinus,ImPlus } from "react-icons/im"


export default function  SingleRoom(props) {
    //const contex = useContext(RoomContext);
    const contex = useContext(RoomContext);
    const [state] = useState({
            slug: props.match.params.slug,
            defaultBcg: defaultBcg});
    const [room, setRoom] =  useState(undefined);
    const [defaultImages, setDefaultImages] = useState();
    const [nights, setNights] = useState(0);
    const [price, setPrice] = useState(0);
    
    useEffect(()=>{
        
            const { getRoom } = contex;
            const result = getRoom(state.slug);
            const { images} = result;
            const [ ...defaultImages] = images;
            setRoom(result);
            setDefaultImages(defaultImages);
        
    }, [contex, state.slug]);

const renderButton =() =>
{
    return (
    <div className="error">
        <h3> no such room could be found...</h3>
        <Link to="/" className="btn-primary">back to rooms</Link>
    </div>);
}

const increment=( price) =>{
  setPrice(price * (nights +1));
  setNights(nights +1);
}

const decrement=(price)=>{
  if(nights>0){
    setPrice(price* (nights -1));
    setNights(nights -1);
  }
}

const reserve =(room) =>{
  const { setBooking } = contex;
  const reserved = contex.booked;
  const objReserved = {
    room,
    nights,
    price
  }

  reserved.push(objReserved)

  setBooking(reserved )
}

return (
    <>
    {!room  ?  <div>{renderButton()}</div>: 
        <>
        <StyledHero img={'.'+room.images[0] || state.defaultBcg}>
          <Banner title={`${room.name} room`}>
            <Link to="/" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImages.map((item, index) => (
              <img key={index} src={'.'+item} alt={room.name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{room.description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${room.price}</h6>
              <h6>size : {room.size} SQFT</h6>
              <h6>
                max capacity :
                {room.capacity > 1 ? `${room.capacity} people` : `${room.capacity} person`}
              </h6>
              <h6>{room.pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{room.breakfast && "free breakfast included"}</h6>
            </article>
            <article className="booking">
              <h3>Booking</h3>
              <div className="booking-room" ><h6>Nights: {nights}</h6> 
              <button type="button" className="booking-btn" onClick={()=>decrement(room.price)}>
              <ImMinus/>
              </button>
              <button type="button" className="booking-btn" onClick={()=>increment(room.price)}>
              <ImPlus/>
              </button>
               </div>
              <h6>Total: ${price}</h6>
              <button type="button" className="booking-reserve" onClick={()=>reserve(room)}>
               Reserve
              </button>
            </article>
          </div>
        </section>
        </>
        }
        </>            
    );
  
}
