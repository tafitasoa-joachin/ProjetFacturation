import { Card, Typography } from "antd";
import React from "react";

const { Text } = Typography;

interface Client {
  nom: string;
  email: string;
  adresse?: string;
  ville?: string;
  nif?: string;
}

interface FactureCliProps {
  client: Client | null;
  dateCreation: string | null;
  id_facture: number;
}

const FactureCli: React.FC<FactureCliProps> = ({ client, dateCreation, id_facture }) => {
  if (!client) {
    return <div><strong>Facture n°:</strong> {id_facture}</div>;
  }

  console.log("Client", client);

  return (
    <div>
      <Typography>
        <Typography.Paragraph style={{ margin: 0 }}>
          <strong>Facture n°:</strong> {id_facture} { dateCreation && new Date(dateCreation).toLocaleDateString()}
        </Typography.Paragraph>
      </Typography>
      <Card style={{ width: 625 }}>
        <Text style={{ textDecoration: "underline" }}>
          {" "}
          <strong>Client:</strong>{" "}
        </Text>
        <Typography style={{ marginLeft: 20 }}>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Société:</strong>{" "}
            <div style={{ marginLeft: 200 }}> {client.nom}</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Responsable:</strong>{" "}
            <div style={{ marginLeft: 200 }}> {client.nom}</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Adresse:</strong>
            <div style={{ marginLeft: 200 }}> {client.adresse || "N/A"}</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Ville:</strong>{" "}
            <div style={{ marginLeft: 200 }}> {client.ville || "N/A"}</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>Mail:</strong>{" "}
            <div style={{ marginLeft: 200 }}> {client.email}</div>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0, display: "flex" }}>
            <strong>NIF:</strong>{" "}
            <div style={{ marginLeft: 200 }}> {client.nif || "N/A"} </div>
          </Typography.Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default FactureCli;
