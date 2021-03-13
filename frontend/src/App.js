import React, { useState } from "react";
import './App.css';
import './Title.css'
import axios from "axios"
import TopHeader from './components/TopHeader'
import LabelBottomNavigation from './components/LabelBottomNavigation'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Maps from './pages/Maps';
import Search from './pages/Search';
import PresetRoutes from './pages/PresetRoutes';
import PointsOfInterest from "./pages/PointsOfInterest";

function App() {

  const [activeItem, setActiveItem] = useState({
    title: "Vikafjellet",
    status: "Midlertidig stengt på grunn av sterk vind"
  });
  /*
  componentDidMount() {
    
    //this.testAxiosPost();
    this.testAxiosGet();
    //this.renderItem();

  }
 /*
  testAxiosPost = () => {
    const testData = {
      title: "Vikafjellet",
      status: "Midlertidig stengt på grunn av sterk vind"
    }
    axios
      .post("/api/brafikks/", testData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => console.log(err));
    console.log("Done with POST")
  }
 */
  testAxiosGet = () => {
    axios
      .get("/api/poi/?longitude=70&latitude=90")
      .then(res => this.setState({ activeItem: res.data }))
      .catch(err => console.log(err));
    console.log("Done with GET")
  }

  return (
    <Router>
      <div className="App" >
        <TopHeader />
        <Route exact path="/" render={props => (
          <Home />
        )} />
        <Route path="/search" component={Search} />
        <Route path="/pointsofinterest" component={PointsOfInterest} />
        <Route path="/maps" component={Maps} />
        <Route path="/routes" component={PresetRoutes} />

        <LabelBottomNavigation />
      </div >
    </Router>
  );
}



export default App;
