import React, { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
const LoadingBtn = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Button type="primary" size="large" loading>
          Loading
        </Button>
      </Space>
    </Space>
  );
};
export default LoadingBtn;
