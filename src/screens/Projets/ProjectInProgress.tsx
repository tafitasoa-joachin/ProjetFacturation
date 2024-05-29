import { Card, Divider, Rate, Typography } from "antd";
import React from "react";
import DescriptionModals from "./TourDescription/DescriptionModals";

const { Text } = Typography;
const ProjectInProgress = () => {
  return (
    <>
      <Card
        title="LoveCoder"
        bordered={false}
        style={{ width: 300, borderTop: "3px solid #3ba0e9" }}
      >
        <Text>
          Site de rencontre entre les personnes qui passionne au technologie.{" "}
        </Text>
        <Rate allowHalf defaultValue={2.5} />
        <DescriptionModals />
      </Card>
    </>
  );
};

export default ProjectInProgress;
