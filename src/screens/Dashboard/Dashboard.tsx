import React, { useContext, useState } from "react";
import { Breadcrumb, Card, Divider, Space, Typography, DatePicker } from "antd";
import { FaMoneyCheckAlt, FaUsers } from "react-icons/fa";
import ChartBar from "../ChartBar/ChartBar";
import dayjs from "dayjs";
import { useQuery, gql } from "@apollo/client";
import { GET_CLIENTS_AND_PROJECTS_COUNT } from "../../gql/dashboard";
import { AppContext } from "../../components/Context";
import { useColor } from "../../components/color";


const Dashboard: React.FC = () => {
  const { isDark } = useContext(AppContext);
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year()); // Utilisation de dayjs().year() pour obtenir l'année actuelle

  const handleYearChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedYear(date.year());
    }
  };

  const { loading, error, data } = useQuery(GET_CLIENTS_AND_PROJECTS_COUNT, {
    variables: { year: selectedYear },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { clientCount, projectCount } = data.clientsAndProjectsCount;
  const BACKGROUND_FB = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <Space direction="horizontal" style={{ gap: "60px", marginTop: "20px" }}>
        <Card style={{ borderLeft: "3px solid green", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <FaMoneyCheckAlt />
            <small style={{ color: COLOR.color}}>Total budget</small>
          </Space>
          <Typography.Title style={{ color: COLOR.color}}>$4567600</Typography.Title>
        </Card>
        <Card style={{ borderLeft: "3px solid blue", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <FaUsers />
            <small style={{ color: COLOR.color}}>Client</small>
          </Space>
          <Typography.Title style={{ color: COLOR.color}}>{clientCount}</Typography.Title>
        </Card>
        <Card style={{ borderLeft: "3px solid red", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <small style={{ color: COLOR.color}}>Stock</small>
          </Space>
          <Typography.Title style={{ color: COLOR.color}}>$4567600</Typography.Title>
        </Card>
        <Card style={{ borderLeft: "3px solid yellow", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <small style={{ color: COLOR.color}}>Projets</small>
          </Space>
          <Typography.Title style={{ color: COLOR.color}}>{projectCount}</Typography.Title>
        </Card>
      </Space>
      <Divider />
      <DatePicker
        picker="year"
        defaultValue={dayjs(selectedYear.toString())} // Convertir selectedYear en string
        onChange={handleYearChange}
        style={{ marginBottom: '20px' }}
      />
      <ChartBar year={selectedYear} />
    </>
  );
};

export default Dashboard;
