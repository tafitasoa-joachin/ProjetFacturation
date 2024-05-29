import { Badge, Card, Space } from "antd";
import React from "react";

const ProjectDone = () => {
  return (
    <>
      <Space>
        <Badge.Ribbon text="Hippies">
          <Card title="Projet" size="small" style={{ width: 200 }}>
            description
          </Card>
        </Badge.Ribbon>
      </Space>
    </>
  );
};

export default ProjectDone;
