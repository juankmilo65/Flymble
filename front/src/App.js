import './App.css';
import Home from "./pages/Home"
import Room from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import { Route, Switch } from 'react-router';
import Navbar from "./components/Navbar"
import Checkout from './pages/Checkout'

function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} ></Route> 
      <Route exact path="/rooms" component={Room} ></Route> 
      <Route exact path="/rooms/:slug" component={SingleRoom} ></Route> 
      <Route exact path="/checkout" component={Checkout} ></Route> 
      <Route component={Error} ></Route>
    </Switch>
    </>
  );
}

export default App;
