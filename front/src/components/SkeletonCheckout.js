import React from 'react'
import Skeleton from 'react-loading-skeleton'; 

export default function SkeletonCheckout() {

    const loader = () =>{
        let rows =[];
        for (let index = 0; index < 5; index++) {
            rows.push(
                <div className="checkout-content-padding">
                <div className="img-container-checkout">
                <Skeleton width={200} height={90}/>
                <div>
                <h1><Skeleton/></h1>
                <h5><Skeleton/></h5>
                </div>
                <div>
                <div className="container">
                <Skeleton width={5} height={5}/>
                <div className="checkout-room" >
                <Skeleton width={20} height={20}/>
                <Skeleton width={10} height={20}/>
                <Skeleton width={20} height={20}/>
                <h6><Skeleton /></h6> 
                </div>
                <div className="info-left" >
                </div>
                </div>
                </div>
                </div>
            </div>             
            ) 
        }

        return rows
    }


    return (<>{loader()}</>)
}
