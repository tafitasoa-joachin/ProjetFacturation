import { Layout, Select, Button, Modal } from "antd";
import { LogoutOutlined, BulbOutlined, BulbFilled } from "@ant-design/icons";
import React, { useContext } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/Context";
import { useTranslation } from "react-i18next";
import { useColor } from "../../components/color";
const { Header } = Layout;
const { Option } = Select;

const NavBar = () => {
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

  const headerStyle = {
    backgroundColor: BACKGROUND_VIEW.backgroundColor,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
  };

  const textStyle: React.CSSProperties = {
    color: isDark ? "white" : "black",
  };

  return (
    <div>
      <Header className="header" style={headerStyle}>
        <Typography>
          <Typography.Title level={3} style={textStyle}>MCA-FACT</Typography.Title>
        </Typography>
        <div>
          <Select
            defaultValue={valueLang}
            style={{ marginRight: 16}}
            onChange={handleChangeLangue}
          >
            <Option value="fr">Français</Option>
            <Option value="en">Anglais</Option>
          </Select>
          <Button
            type="text"
            icon={isDark ? <BulbFilled style={textStyle} /> : <BulbOutlined style={textStyle} />}
            style={{ marginRight: 16 }}
            onClick={toggleSwitch}
          />
          <Button
            type="text"
            icon={<LogoutOutlined style={textStyle} />}
            onClick={signout}
          />
        </div>
      </Header>
    </div>
  );
};

export default NavBar;
