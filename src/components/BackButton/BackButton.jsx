import {NavLink} from "react-router-dom";
import {Button} from "antd";
import {RollbackOutlined} from "@ant-design/icons";
import React from "react";

const BackButton = () => {
  return (
    <NavLink className="backButton" to="./">
      <Button type="primary">
        <RollbackOutlined />
      </Button>
    </NavLink>
  );
};

export default BackButton;
