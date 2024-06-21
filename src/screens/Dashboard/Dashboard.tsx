import React, { useContext, useState } from "react";
import { Breadcrumb, Card, Divider, Space, Typography, DatePicker, Statistic, Table } from "antd";
import { Fa500Px, FaMoneyCheckAlt, FaUserLock, FaUsers } from "react-icons/fa";
import ChartBar from "../ChartBar/ChartBar";
import dayjs from "dayjs";
import { useQuery, gql } from "@apollo/client";
import { GET_CLIENTS_AND_PROJECTS_COUNT } from "../../gql/dashboard";
import { AppContext } from "../../components/Context";
import { useColor } from "../../components/color";
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";


const Dashboard: React.FC = () => {
  const { t } = useTranslation();
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
    <div>
      <Typography.Title level={4}>{t("tb")}</Typography.Title>
      <Space direction="horizontal" style={{ gap: "60px", marginTop: "20px" }}>
        <Card style={{ borderLeft: "3px solid green", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <DollarCircleOutlined style={{ color: COLOR.color, backgroundColor: "green", borderRadius: 20, fontSize: 20, padding: 10}}/>
            <Statistic title="Total budget" value={"200"}/>
          </Space>
        </Card>
        <Card style={{ borderLeft: "3px solid blue", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <UserOutlined style={{ color: COLOR.color, backgroundColor: "blue", borderRadius: 20, fontSize: 20, padding: 10}}/>
            <Statistic title="Clients" value={`${clientCount}`}/>
          </Space>
        </Card>
        <Card style={{ borderLeft: "3px solid yellow", backgroundColor: BACKGROUND_FB.backgroundColor }}>
          <Space direction="horizontal">
            <ShoppingCartOutlined style={{ color: COLOR.color, backgroundColor: "yellow", borderRadius: 20, fontSize: 20, padding: 10}}/>
            <Statistic title="Projets" value={`${projectCount}`}/>
          </Space>
        </Card>
      </Space>
      <Divider/>
      <DatePicker
        picker="year"
        defaultValue={dayjs(selectedYear.toString())} // Convertir selectedYear en string
        onChange={handleYearChange}
        style={{ marginBottom: '20px' }}
      />
      <ChartBar year={selectedYear} />
    </div>
  );
};

export default Dashboard;
