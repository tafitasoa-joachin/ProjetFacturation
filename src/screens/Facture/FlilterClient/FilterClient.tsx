import { Card, Divider, Input, Radio, Table } from "antd";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";

const FilterClient = () => {
  const [search, setSearch] = useState("");

  interface DataType {
    key: React.Key;
    name: string;
    id: number;
  }

  const data: DataType[] = [
    {
      key: "1",
      id: 1,
      name: "John Brown",
    },
    {
      key: 2,
      id: 2,
      name: "Jim Green",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
      filteredValue: [search],
      // onFilter: (value: any, record: any) => {
      //   return (
      //     record.id.toLowerCase().includes(value.toLowerCase()) ||
      //     record.Name.toLowerCase().includes(value.toLowerCase())
      //   );
      // },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const [selectionType, setSelectionType] = useState<"radio" | "checkbox">(
    "radio"
  );
  // search
  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <div style={{ margin: "20px" }}>
      <Card>
        <Radio.Group
          onChange={({ target: { value } }) => {}}
          value={selectionType}
        >
          <Search
            placeholder="Rechercher un client"
            onSearch={onSearch}
            enterButton
            style={{ width: "15rem" }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {/* <Radio value="radio">radio</Radio> */}
        </Radio.Group>

        <Divider />

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  );
};

export default FilterClient;
