import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  Objet: number;
  Nombre: number;
  Prix: number;
  Total: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Objet",
    dataIndex: "Objet",
    rowScope: "row",
  },
  {
    title: "Nombre",
    dataIndex: "Nombre",
    rowScope: "row",
  },
  {
    title: "Prix unitaire",
    dataIndex: "Prix",
    rowScope: "row",
  },
  {
    title: "Total",
    dataIndex: "Total",
  },
];

const RecoveryFact = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography>
        <Typography.Paragraph style={{ margin: 0 }}>
          Montants exprimés en Dollars
        </Typography.Paragraph>
      </Typography>
      <Table columns={columns} bordered />
    </div>
  );
};

export default RecoveryFact;
