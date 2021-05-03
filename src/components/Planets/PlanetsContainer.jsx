import React from "react";
import Planets from "./Planets";
import moment from "moment";
import reqwest from "reqwest";

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsive: ["sm"],
  },
  {
    title: "Rotation period",
    dataIndex: "rotation_period",
    key: "rotation_period",
    responsive: ["sm"],
  },
  {
    title: "Orbital period",
    dataIndex: "orbital_period",
    key: "orbital_period",
    responsive: ["sm"],
  },
  {
    title: "Diameter",
    dataIndex: "diameter",
    key: "diameter",
    responsive: ["sm"],
  },
  {
    title: "Climate",
    dataIndex: "climate",
    key: "climate",
    responsive: ["sm"],
  },
  {
    title: "Gravity",
    dataIndex: "gravity",
    key: "gravity",
    responsive: ["sm"],
  },
  {
    title: "Terrain",
    dataIndex: "terrain",
    key: "terrain",
    responsive: ["sm"],
  },
  {
    title: "Surface water",
    dataIndex: "surface_water",
    key: "surface_water",
    responsive: ["sm"],
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    responsive: ["sm"],
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    responsive: ["sm"],
    render: (text) => {
      return moment(text).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  {
    title: "Edited",
    dataIndex: "edited",
    key: "edited",
    responsive: ["sm"],
    render: (text) => {
      return moment(text).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
];

class PlanetsContainer extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    count: Number,
    loading: false,
  };

  componentDidMount() {
    const {pagination} = this.state;
    this.fetch({pagination});
  }

  fetch = (params = {}) => {
    this.setState({loading: true});
    reqwest({
      url: "https://swapi.dev/api/planets/",
      method: "get",
      type: "json",
      data: "",
    }).then((data) => {
      console.log(data);
      this.setState({
        loading: false,
        count: data.count,
        data: data.results,
        pagination: {
          showSizeChanger: true,
          current: 1,
          pageSize: 10,
          total: data.count,
          onChange: this.onChange,
        },
      });
    });
  };

  onChange = (page) => {
    this.setState({loading: true});
    this.setState({current: page});
    reqwest({
      url: `https://swapi.dev/api/planets/?page=${page}`,
      method: "get",
      type: "json",
      data: "",
    }).then((data) => {
      console.log(data);
      this.setState({
        loading: false,
        count: data.count,
        data: data.results,
        pagination: {
          showSizeChanger: true,
          current: page,
          pageSize: 10,
          total: data.count,
          onChange: this.onChange,
        },
      });
    });
  };

  // componentDidMount() {
  //   axios
  //     .get(
  //       `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
  //     )
  //     .then((response) => {
  //       this.props.setUsers(response.data.items);
  //       this.props.setTotalUsersCount(response.data.totalCount);
  //     });
  // }

  // handleTableChange = (pagination, filters, sorter) => {
  //   this.fetch({
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     pagination,
  //     ...filters,
  //   });
  // };

  render() {
    const {data, pagination, loading} = this.state;
    return (
      <Planets
        data={data}
        columns={COLUMNS}
        sticky
        rowKey={(record) => record.key}
        pagination={pagination}
        loading={loading}
      />
    );
  }
}

export default PlanetsContainer;
