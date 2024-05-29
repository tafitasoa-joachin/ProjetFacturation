import { Card, Typography } from "antd";
import React from "react";
const { Text } = Typography;
const FactureCli = () => {
  return (
    <div>
      <Typography>
        <Typography.Paragraph style={{ margin: 0 }}>
          <strong>Facture n°:</strong> 001 du 1er mars 2023 pour la periode de
          1er fevrier au 28 fevrier
        </Typography.Paragraph>
      </Typography>
      <Card style={{ width: 625 }}>
        <Text style={{ textDecoration: "underline" }}>
          {" "}
          <strong>Client:</strong>{" "}
        </Text>
        <Typography style={{ marginLeft: 20 }}>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Sociéte:</strong>{" "}
            <div style={{ marginLeft: 200 }}> BFV</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Responsable:</strong>{" "}
            <div style={{ marginLeft: 200 }}> admin</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Adress:</strong>
            <div style={{ marginLeft: 200 }}> Tananarivo ville</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Ville:</strong>{" "}
            <div style={{ marginLeft: 200 }}> Tananarive 101, Madagascar</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Mail:</strong>{" "}
            <div style={{ marginLeft: 200 }}> ludy_dev@gmail.com</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>NIF:</strong>{" "}
            <div style={{ marginLeft: 200 }}> 34704500 </div>
          </Typography.Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default FactureCli;
