import React, { Component} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';

const api = "https://6071b51f50aaea0017284f87.mockapi.io/hotels/hotel";
const RoomContext  = React.createContext();

 class RoomProvider extends Component {

    state = {
        rooms:[],
        sortedRooms: [],
        featuredRooms:[],
        loading:true,
        booked:[]
    }

    async getData() {
      return  await axios.get(api)
        .then(response =>{
            return response.data;
        })
        .catch(err => {
            throw  err
        });
      };

    componentDidMount(){
        this.getData().then(reponse =>{
            let rooms = this.formatData(reponse);
                let featuredRooms = rooms.filter(room => room.featured === true );
                this.setState({
                    rooms, featuredRooms, loading: false
                }) 
        }).catch(err=>
            {
                let message = err.response.status === 404 ?
                "Error Api conection": 
                "default error message"
                this.errorMessage(message);
            }
        )
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
                let room =  {...item.fields, images, id} 
                return room
        });
        return tempItems
    }


    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
      };

      setBooking = booked => {
        this.setState({...this.state, booked});
      }

      setUpdateReservation = (guiId, price, nights) => {
       
        this.state.booked.find(o=> o.guiId === guiId).price= price;
        this.state.booked.find(o=> o.guiId === guiId).nights = nights;
        this.setState({...this.state});
      }


      deleteReservation = (guiId) =>{
        this.setState({...this.state, booked: this.state.booked.filter((item) => item.guiId !== guiId)});
      }

      errorMessage =(message) =>{
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }

        infoMessage = (message) =>{
            toast.info(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

    render() {
        
        return (
            <RoomContext.Provider value ={{
                ...this.state,
                getRoom: this.getRoom,
                setBooking: this.setBooking,
                errorMessage: this.errorMessage,
                infoMessage: this.infoMessage,
                setUpdateReservation: this.setUpdateReservation,
                deleteReservation: this.deleteReservation
                }}>
               {this.props.children} 
            </RoomContext.Provider >
        )
    }
}
const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}
