import React, { Component } from "react";
import axios from "axios";
import './App.css';

// TODO This is just one way to handle CSRF tokens with axios
// https://dev.to/mdrhmn/deploying-react-django-app-using-heroku-2gfa 
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        id: "undefined",
        title: "undefined",
        status: "undefined"
      }
    }
  }

  testAxios = () => {
    axios
      .get("backend/brafikks")
      .then(res => this.setState({ activeItem: res.data }))
      .catch(err => console.log(err));
  }

  renderItem = () => {
    return (
      <div>
        <p>
          ID: {this.state.activeItem.id}
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
            {this.testAxios()}
            {this.renderItem()}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
