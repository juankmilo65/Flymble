import React , { useState, useContext } from 'react'
import {ImMinus,ImPlus } from "react-icons/im"
import {AiFillDelete} from "react-icons/ai"
import { RoomContext } from "../contex";

export default function RoomCheckout({booking}) {

    const contex = useContext(RoomContext);
    const {room, nights, price, guiId} = booking;
    const [nightsCheckout, setNightsCheckout] = useState(nights);
    const [priceCheckout, setPriceCheckout] = useState(price);
    const {setUpdateReservation}= contex;
    
    const increment=( price) =>{
        setPriceCheckout(price * (nightsCheckout +1));
        setNightsCheckout(nightsCheckout +1);
        setUpdateReservation(guiId, price* (nightsCheckout +1), nightsCheckout + 1);
    }
    
    const decrement=(price, guiId)=>{
        if(nightsCheckout > 1){
            setPriceCheckout(price* (nightsCheckout -1));
            setNightsCheckout(nightsCheckout - 1);
            setUpdateReservation(guiId, price* (nightsCheckout -1), nightsCheckout - 1);
        }else
        {
            contex.errorMessage('You can not set 0 for this option, please delete the reservation if you do not want to book this hotel!')
        }
  }
  
  const removeReservation=(guid)=>{
    const {deleteReservation} = contex;
    deleteReservation(guid);
}
const onTodoChange =( nightsCheckout, guiId, price)=>{
    
    const nights = parseInt(nightsCheckout)
    
    if(nights > 100)
    {
        contex.errorMessage('Dear customer, the maximum number of nights is 100.');
    }else if( nights>1){
        setPriceCheckout(price* nights);
        setNightsCheckout(nights);
        setUpdateReservation(guiId, price* nights, nights);
    }else
    {
        contex.errorMessage('You can not set 0 or Empty for this option, please delete the reservation if you do not want to book this hotel, value by default is 1');
        setPriceCheckout(price);
        setNightsCheckout(1);
        setUpdateReservation(guiId, price, 1);
    }

}

    return (
        <div className="checkout-content-padding">
            <div className="img-container-checkout">
            <img src={room.images[0]} alt="single room" />
            <div>
            <h1>{room.name}</h1>
            <h5>{room.description}</h5>
            </div>
            <div>
            <div className="container">
            <button type="button" className="info-left"  onClick={()=>removeReservation(guiId)}>
                <AiFillDelete/>
            </button>
            <div className="checkout-room" >
            <button type="button" className="booking-btn" onClick={()=>decrement(room.price, guiId)}>
                <ImMinus/>
            </button>
            <input type="number" value={nightsCheckout} onChange={e => onTodoChange(e.target.value, guiId, room.price)}/> 
            <button type="button" className="booking-btn" onClick={()=>increment(room.price, guiId)}>
                <ImPlus/>
            </button>
            <h6>${priceCheckout}</h6> 
            </div>
            <div className="info-left" >
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}
