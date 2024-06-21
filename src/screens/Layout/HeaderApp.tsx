import { Layout, Select, Button, Modal, Image, Space, Badge } from "antd";
import { LogoutOutlined, BulbOutlined, BulbFilled, MailOutlined, BellFilled, BellOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/Context";
import { useTranslation } from "react-i18next";
import { useColor } from "../../components/color";
const { Header } = Layout;
const { Option } = Select;

const HeaderApp = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isDark, isTranslated, setIsDark, valueLang, setIsTranslated, setValue } = useContext(AppContext);

  const toggleSwitch = () => setIsDark(!isDark);

  const handleChangeLangue = (value: string) => {
    setValue(value);
    i18n.changeLanguage(value);
    setIsTranslated(!isTranslated);
  };

  const signout = () => {
    Modal.confirm({
      title: t("Voulez-vous vous déconnecter ?"),
      okText: t("Oui"),
      cancelText: t("Non"),
      onOk: async () => {
        try {
          localStorage.removeItem("token");
          navigate('/login');
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const BACKGROUND_VIEW = isDark ? useColor.BGCOLOR_DARK : useColor.BGCOLOR_WHITE;

  const HeaderAppStyle = {
    backgroundColor: BACKGROUND_VIEW.backgroundColor,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4x px 4px 12px",
    borderBottom: "1px solid lightGray",
  };

  const textStyle: React.CSSProperties = {
    color: isDark ? "white" : "black",
    fontSize: 20
  };

  return (
    <div>
      <Header className="HeaderApp" style={HeaderAppStyle}>
        <Typography.Title level={3} style={{ color: "blue", marginLeft: 200}}>MCA-FACT</Typography.Title>
        <Space style={{ gap: 23}}>
          <Select
            defaultValue={valueLang}
            onChange={handleChangeLangue}
          >
            <Option value="fr">Français</Option>
            <Option value="en">Anglais</Option>
          </Select>
          <Badge count={20}>
            <BellOutlined 
              onClick={() => {}}
              style={textStyle}
            />
          </Badge>
          <Button
            type="text"
            icon={isDark ? <BulbFilled style={textStyle} /> : <BulbOutlined style={textStyle} />}
            onClick={toggleSwitch}
            style={{ marginLeft: 10}}
          />
          <Button
            type="text"
            icon={<LogoutOutlined style={textStyle} />}
            onClick={signout}
            style={{ fontSize: 16}}
          />
        </Space>
      </Header>
    </div>
  );
};

export default HeaderApp;
