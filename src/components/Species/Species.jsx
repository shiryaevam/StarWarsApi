import React from "react";
import BackButton from "../BackButton/BackButton";
import {Table} from "antd";

const Species = (props) => {
  return (
    <div>
      <BackButton />
      <Table
        dataSource={props.data}
        sticky
        columns={props.columns}
        loading={props.loading}
        pagination={props.pagination}
      />
    </div>
  );
};

export default Species;
