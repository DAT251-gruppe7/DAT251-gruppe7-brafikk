import React, { Component } from "react";
import './App.css';
import './Title.css'
// import axios from "axios"
import TopHeader from './components/TopHeader'
import LabelBottomNavigation from './components/LabelBottomNavigation'
import ListItemLink from './components/ListItemLink'
import InformationList from './components/InformationList';

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

  componentDidMount() {
    /*
    this.testAxiosPost();
    this.testAxiosGet();
    this.renderItem();
    */
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
      <div className="App" >
        <TopHeader />
        <InformationList />
        <LabelBottomNavigation />
      </div >
    );
  }
}

export default App;
