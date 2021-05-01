import React from "react";
import Home from "./Home";
import {NavLink} from "react-router-dom";
import {Button} from "antd";

class HomeContainer extends React.Component {
  state = {
    columns: [
      {
        title: "Номер",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Название",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "API",
        dataIndex: "api",
        key: "api",
        render: (text) => <a href={text}>{text}</a>,
      },
      {
        title: "",
        dataIndex: "action",
        key: "action",
        render: (text) => (
          <NavLink
            to={text}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              style={{width: "100%", textTransform: "capitalize"}}
            >
              {text}
            </Button>
          </NavLink>
        ),
      },
    ],
    data: [
      {
        key: "1",
        name: "films",
        number: 1,
        api: "https://swapi.dev/api/films/",
        action: "films",
      },
      {
        key: "2",
        name: "people",
        number: 2,
        api: "https://swapi.dev/api/people/",
        action: "people",
      },
      {
        key: "3",
        name: "planets",
        number: 3,
        api: "https://swapi.dev/api/planets/",
        action: "planets",
      },
      {
        key: "4",
        name: "species",
        number: 4,
        api: "https://swapi.dev/api/species/",
        action: "species",
      },
      {
        key: "5",
        name: "starships",
        number: 5,
        api: "https://swapi.dev/api/starships/",
        action: "starships",
      },
      {
        key: "6",
        name: "vehicles",
        number: 6,
        api: "https://swapi.dev/api/vehicles/",
        action: "vehicles",
      },
    ],
    pagination: {
      hideOnSinglePage: true,
    },
  };

  render() {
    return (
      <Home
        columns={this.state.columns}
        data={this.state.data}
        pagination={this.state.pagination}
      />
    );
  }
}

export default HomeContainer;
