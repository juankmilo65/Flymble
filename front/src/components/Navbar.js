import React, { Component } from 'react'
import logo from '../images/vectorpaint.svg'
import {FaAlignRight } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { RoomContext } from "../contex";

export default class Navbar extends Component {
    static contextType = RoomContext;
    state={
        isOpen:false
    }
    handleToogle= () =>{
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        const { booked } = this.context;
        return (
            <nav className="navbar">
                <div className="nav-center"> 
                <div className="nav-header">
                <Link to="/">
                    <img src={logo} alt="Hotels Reservation"></img>
                </Link>
                <button type="button" className="nav-btn" onClick={this.handleToogle}>
                    <FaAlignRight className="nav-icon"/>
                </button>
                </div>
                <ul className={this.state.isOpen?"nav-links show-nav":
                "nav-links"}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    </ul>
                </div>
                <div className="nav-reservations"> 
                Total Reservations: {booked.length}
                <div >
                <Link to="/checkout" className={`btn-primary  ${booked.length=== 0  ? "disabledbutton" : ""}` } >
                    checkout
                </Link>
                </div>
                </div> 
            </nav>
        )
    }
}
