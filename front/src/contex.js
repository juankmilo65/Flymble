import React, { Component} from 'react'
import axios from "axios";
//import items from './data'

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
        const response = await axios.get(api);
        return response.data;
      };

    componentDidMount(){
        this.getData().then(reponse =>{
            let rooms = this.formatData(reponse);
                let featuredRooms = rooms.filter(room => room.featured === true );
                this.setState({
                    rooms, featuredRooms, loading: false
                })
        })
    }

    formatData(items){
        console.log(process.env.PUBLIC_URL)
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

    render() {
        
        return (
            <RoomContext.Provider value ={{
                ...this.state,
                getRoom: this.getRoom,
                setBooking: this.setBooking
                }}>
               {this.props.children} 
            </RoomContext.Provider >
        )
    }
}
const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}
