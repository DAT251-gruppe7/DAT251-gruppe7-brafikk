import React, { Component } from "react";
import './App.css';
import './Title.css'
// import axios from "axios"
import TopHeader from './components/TopHeader'
import LabelBottomNavigation from './components/LabelBottomNavigation'
import ListItemLink from './components/ListItemLink'
import InformationList from './components/InformationList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Maps from './pages/Maps';
import Account from './pages/Account';
import PointsOfInterest from "./pages/PointsOfInterest";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        title: "Vikafjellet",
        status: "Midlertidig stengt på grunn av sterk vind"
      }
    }
  }
  /*
  componentDidMount() {
    
    this.testAxiosPost();
    this.testAxiosGet();
    this.renderItem();

  }

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

  testAxiosGet = () => {
    axios
      .get("/api/brafikks/1")
      .then(res => this.setState({ activeItem: res.data }))
      .catch(err => console.log(err));
    console.log("Done with GET")
  }
  */

  render() {
    return (
      <Router>
        <div className="App" >
          <TopHeader />
          <Route exact path="/" render={props => (
            <Home />
          )} />
          <Route path="/pointsofinterest" component={PointsOfInterest} />
          <Route path="/maps" component={Maps} />
          <Route path="/account" component={Account} />

          <LabelBottomNavigation />
        </div >
      </Router>
    );
  }
}

export default App;
