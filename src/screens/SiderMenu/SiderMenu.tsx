import { Avatar, Menu, Divider, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {  MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { BsFillHandbagFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../components/Context";
import { gray, useColor } from "../../components/color";
import { useQuery } from "@apollo/client";
import { UTILISATEUR } from "../../gql/admin";
import { jwtDecode } from "jwt-decode";
const { Title } = Typography;

const SiderMenu = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(AppContext);
  const [userId, setUserId] = useState<string | null>(null);

  const BACKGROUND_VIEW = isDark ? useColor.BGCOLOR_DARK : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;
  
  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const token1 =  localStorage.getItem("token");
        if (token1) {
          const decodedToken: any = jwtDecode(token1);
          setUserId(decodedToken.utilisateurId);
        }
      } catch (error) {
        console.log(error);      }
    };
    getTokenAndDecode();
  }, []);

  const { loading, error, data, refetch } = useQuery(UTILISATEUR, {
    variables: { id: userId },
  });

  return (
    <div>
      <Avatar
        style={{
          backgroundColor: "#87d068",
          left: 80,
        }}
        size={"large"}
        icon={<UserOutlined />}
      />
      <Title level={4} style={{ textAlign: "center", color: COLOR.color }}>
       { data?.utilisateurOne?.nom}
      </Title>
      <Divider style={{ margin: 0, backgroundColor: gray }} />
      <Menu
        style={{backgroundColor: BACKGROUND_VIEW.backgroundColor, color: COLOR.color}}
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            key: "/",
            icon: <MdDashboardCustomize />,
            label: "Accueil",
          },
          {
            key: "/Client",
            icon: <FaUsers />,
            label: "Clients",
          },
          {
            key: "/Projects",
            icon: <BsFillHandbagFill />,
            label: "Projets",
          },
          {
            key: "/Tasks",
            icon: <BsFillHandbagFill />,
            label: "Tâches",
          },
          {
            key: "/Devis",
            icon: <BsFillHandbagFill />,
            label: "Devis",
          },
          {
            key: "/Facture",
            icon: <RiBillFill />,
            label: "Facture",
          },
          {
            key: "/Paiements",
            icon: <RiBillFill />,
            label: "Paiements",
          }
        ]}
      />
    </div>
  );
};

export default SiderMenu;
