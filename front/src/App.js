import './App.css';
import Home from "./pages/Home"
import Room from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import { Route, Switch } from 'react-router';
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} ></Route> 
      <Route exact path="/rooms" component={Room} ></Route> 
      <Route exact path="/rooms/:slug" component={SingleRoom} ></Route> 
      <Route component={Error} ></Route>
    </Switch>
    </>
  );
}

export default App;
