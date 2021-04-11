import React ,{useContext, useEffect, useState} from 'react'
import RoomCheckout from '../components/RoomCheckout'
import Title from "../components/Title";
import { RoomContext } from "../contex";
import {Link} from 'react-router-dom'

export default function Checkout() {
    const contex = useContext(RoomContext);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const { booked } = contex;
        let totalTemp = 0;

        booked.map((booking) => {
            totalTemp = booking.price + totalTemp;
        })

        setTotal(totalTemp);
    
}, [contex]);

    return (
        <div className="checkout-content">
            <Title title="Checkout"/>
            {contex.booked && contex.booked.map(booking =>{ return <RoomCheckout booking={booking} />})}
            <div className="checkout-total">
            <h6>Total: ${total}</h6>
            <Link to="/payment" className="btn-primary ">
                    buy
            </Link>
            </div>
        </div>
    )
}
