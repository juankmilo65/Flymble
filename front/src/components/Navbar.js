import React, { Component } from 'react'
import logo from '../images/vectorpaint.svg'
import {FaAlignRight } from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    
    state={
        isOpen:false
    }
    handleToogle= () =>{
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
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
                Total Reservations: {2}
                <div>
                <Link to="/checkout" className="btn-primary ">
                    checkout
                </Link>
                </div>
                </div> 
            </nav>
        )
    }
}
