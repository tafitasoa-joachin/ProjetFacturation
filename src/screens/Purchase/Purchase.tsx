import { Breadcrumb, Card, Table } from "antd";
import React from "react";
import type { ColumnsType } from "antd/es/table";
interface DataType {
  designation: string;
  Quantite: number;
  Date: string;
  Prix: number;
  Total: number;
}
const sharedOnCell = (_: DataType, index: number) => {
  if (index === 1) {
    return { colSpan: 0 };
  }

  return {};
};
const columns: ColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "Date",
    rowScope: "row",
  },
  {
    title: "Désignation",
    dataIndex: "designation",
    rowScope: "row",
  },
  {
    title: "Qauntité",
    dataIndex: "Quantite",
    // onCell: sharedOnCell,
  },
  {
    title: "Prix unitaire",
    dataIndex: "Prix",
  },
  {
    title: "Total",
    dataIndex: "Total",
  },
];
const Purchase = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Achat</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title="Gestion achat"
        style={{ marginTop: "20px", borderTop: "3px solid #3ba0e9" }}
      >
        <Table columns={columns} bordered />
      </Card>
    </div>
  );
};

export default Purchase;
