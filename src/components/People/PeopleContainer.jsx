import React from "react";
import People from "./People";
import moment from "moment";
import reqwest from "reqwest";
import male from "../../assets/image/mars.png";
import female from "../../assets/image/femenine.png";
import undefinedGender from "../../assets/image/transgender.png";

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsive: ["sm"],
  },
  {
    title: "Height",
    dataIndex: "height",
    key: "height",
    responsive: ["sm"],
  },
  {
    title: "Mass",
    dataIndex: "mass",
    key: "mass",
    responsive: ["sm"],
  },
  {
    title: "Hair color",
    dataIndex: "hair_color",
    key: "hair_color",
    responsive: ["sm"],
  },
  {
    title: "Skin color",
    dataIndex: "skin_color",
    key: "skin_color",
    responsive: ["sm"],
  },
  {
    title: "Eye color",
    dataIndex: "eye_color",
    key: "eye_color",
    responsive: ["sm"],
  },
  {
    title: "Birth year",
    dataIndex: "birth_year",
    key: "birth_year",
    responsive: ["sm"],
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    responsive: ["sm"],
    render: (text) => {
      return (
        <img
          style={{width: "30px"}}
          src={
            text === "male" ? male : text === "n/a" ? undefinedGender : female
          }
          alt="{}"
        />
      );
    },
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

class PeopleContainer extends React.Component {
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
      url: "https://swapi.dev/api/people/",
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
      url: `https://swapi.dev/api/people/?page=${page}`,
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
      <People
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

export default PeopleContainer;
