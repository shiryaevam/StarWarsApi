import React from "react";
import reqwest from "reqwest";
import {Table} from "antd";
import BackButton from "../BackButton/BackButton";
import moment from "moment";

const COLUMNS = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    responsive: ["sm"],
  },
  {
    title: "Episode",
    dataIndex: "episode_id",
    key: "episode_id",
    responsive: ["sm"],
  },
  {
    title: "Description",
    dataIndex: "opening_crawl",
    key: "opening_crawl",
    width: 600,
  },
  {
    title: "Director",
    dataIndex: "director",
    key: "director",
    responsive: ["sm"],
  },
  {
    title: "Producer",
    dataIndex: "producer",
    key: "producer",
    responsive: ["sm"],
  },
  {
    title: "Release date",
    dataIndex: "release_date",
    key: "release_date",
    responsive: ["sm"],
    render: (text) => {
      return moment(text).format("Do MMMM YYYY");
    },
  },
  // {
  //   title: "Characters",
  //   dataIndex: "characters",
  //   key: "characters",
  //   render: (text) => {
  //     return text.map((e) => {
  //       return ` ${e}`;
  //     });
  //   },
  //   responsive: ["sm"],
  // },
  // {
  //   title: "Planets",
  //   dataIndex: "planets",
  //   key: "planets",
  //   render: (text) => {
  //     return text.map((e) => {
  //       return ` ${e}`;
  //     });
  //   },
  //   responsive: ["sm"],
  // },
  // {
  //   title: "Starships",
  //   dataIndex: "starships",
  //   key: "starships",
  //   render: (text) => {
  //     return text.map((e) => {
  //       return ` ${e}`;
  //     });
  //   },
  //   responsive: ["sm"],
  // },
  // {
  //   title: "Vehicles",
  //   dataIndex: "vehicles",
  //   key: "vehicles",
  //   render: (text) => {
  //     return text.map((e) => {
  //       return ` ${e}`;
  //     });
  //   },
  //   responsive: ["sm"],
  // },
  // {
  //   title: "Species",
  //   dataIndex: "species",
  //   key: "species",
  //   render: (text) => {
  //     return text.map((e) => {
  //       return ` ${e}`;
  //     });
  //   },
  //   responsive: ["sm"],
  // },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    responsive: ["sm"],
    render: (text) => {
      return moment(text).format("Do MMMM YYYY, h:mm:ss a");
    },
  },
  {
    title: "Edited",
    dataIndex: "edited",
    key: "edited",
    responsive: ["sm"],
    render: (text) => {
      return moment(text).format("Do MMMM YYYY, h:mm:ss a");
    },
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class Films extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      hideOnSinglePage: true,
    },
    loading: false,
  };

  componentDidMount() {
    const {pagination} = this.state;
    this.fetch({pagination});
  }

  fetch = (params = {}) => {
    this.setState({loading: true});
    reqwest({
      url: "https://swapi.dev/api/films/",
      method: "get",
      type: "json",
      data: getRandomuserParams(params),
    }).then((data) => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.results,
        pagination: {
          ...params.pagination,
        },
      });
    });
  };

  render() {
    const {data, pagination, loading} = this.state;
    return (
      <div>
        <BackButton />
        <Table
          sticky
          columns={COLUMNS}
          rowKey={(record) => record.key}
          dataSource={data}
          pagination={pagination}
          loading={loading}
        />
      </div>
    );
  }
}

export default Films;
