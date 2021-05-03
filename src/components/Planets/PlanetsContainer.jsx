import React from "react";
import Planets from "./Planets";
import moment from "moment";
import reqwest from "reqwest";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {Button, Input, Space} from "antd";

class PlanetsContainer extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    count: Number,
    loading: false,
    searchText: "",
    searchedColumn: "",
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

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{padding: 8}}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{width: 188, marginBottom: 8, display: "block"}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{width: 90}}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({closeDropdown: false});
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({searchText: ""});
  };

  render() {
    const COLUMNS = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        responsive: ["sm"],
        ...this.getColumnSearchProps("name"),
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
        ...this.getColumnSearchProps("diameter"),
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
        ...this.getColumnSearchProps("population"),
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
