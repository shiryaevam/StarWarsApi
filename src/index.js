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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/films" component={Films} />
        <Route path="/people" component={PeopleContainer} />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
