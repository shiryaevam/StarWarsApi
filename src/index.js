import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomeContainer from "./components/Home/HomeContainer";
import "antd/dist/antd.css";
import Films from "./components/Films/Films";
import PeopleContainer from "./components/People/PeopleContainer";
import PlanetsContainer from "./components/Planets/PlanetsContainer";
import StarshipsContainer from "./components/Starships/StarshipsContainer";
import SpeciesContainer from "./components/Species/SpeciesContainer";
import VehiclesContainer from "./components/Vehicles/VehiclesContainer";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/films" component={Films} />
        <Route path="/people" component={PeopleContainer} />
        <Route path="/planets" component={PlanetsContainer} />
        <Route path="/species" component={SpeciesContainer} />
        <Route path="/starships" component={StarshipsContainer} />
        <Route path="/vehicles" component={VehiclesContainer} />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
