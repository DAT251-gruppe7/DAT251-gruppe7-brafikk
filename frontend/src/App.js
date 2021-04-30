import React from "react";
import './App.css';
import './Title.css'
import TopHeader from './components/TopHeader'
import LabelBottomNavigation from './components/LabelBottomNavigation'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import PresetRoutes from './pages/PresetRoutes';
import PointsOfInterest from "./pages/PointsOfInterest";
import SettingsPage from './pages/SettingsPage';

function App() {

  return (
    <Router>
      <div className="App" >
        <TopHeader />
        <Route exact path="/" render={props => (
          <Home />
        )} />
        <Route path="/search" component={Search} />
        <Route path="/pointsofinterest" component={PointsOfInterest} />
        <Route path="/routes" component={PresetRoutes} />
        <Route path="/settingspage" component={SettingsPage} />

        <LabelBottomNavigation />
      </div>
    </Router>
  );
}



export default App;
