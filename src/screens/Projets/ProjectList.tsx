import { Card, Progress, Typography, Divider } from "antd";
import React from "react";
import Title from "antd/es/typography/Title";

const ProjectList = () => {
  const { Text } = Typography;
  return (
    <div>
      <Card title="Progression des projets">
        {" "}
        <Title level={5}>LoveCoder</Title>
          <Progress
            percent={40}
            size="default"
            style={{ width: 500 }}
            strokeColor=" #EAB514"
          />
        <div>
          <Text disabled>Projets pour les passionnants des Technology</Text>
        </div>
        <Divider style={{ margin: 5 }} />
        <Title level={5}>Facturation</Title>
        <Progress
          percent={20}
          size="default"
          style={{ width: 500 }}
          strokeColor="red"
        />
        <div>
          <Text disabled>Géstion et facturation d'un société</Text>
        </div>
        <Divider style={{ margin: 5 }} />
        <Title level={5}>CodingTech</Title>
        <Progress
          percent={90}
          size="default"
          style={{ width: 500 }}
          strokeColor="#36D96C"
        />
        <div>
          <Text disabled>Projets pour apprendre à coder</Text>
        </div>
      </Card>
    </div>
  );
};

export default ProjectList;
