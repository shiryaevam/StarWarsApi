import React from "react";
import s from "./Home.module.css";
import {Table} from "antd";

function Home(props) {
  return (
    <Table
      columns={props.columns}
      dataSource={props.data}
      pagination={props.pagination}
    />
  );
}

export default Home;
