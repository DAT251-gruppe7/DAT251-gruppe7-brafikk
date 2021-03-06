import React, { Component } from "react";
import './App.css';
import axios from "axios"

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

  renderItem = () => {
    return (
      <div>
        <p>
          Title: {this.state.activeItem.title}
        </p>
        <p>
          Status: {this.state.activeItem.status}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>
            Brafikk App
          </h1>
          <div>
            {this.renderItem()}
          </div>
        </header>
      </div >
    );
  }
}

export default App;
