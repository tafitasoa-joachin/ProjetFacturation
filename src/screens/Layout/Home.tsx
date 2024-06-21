import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../Style/Dashboard.scss";
import SiderMenu from "../SiderMenu/SiderMenu";
import FooterBar from "./FooterBar";
import Dashboard from "../Dashboard/Dashboard";
import Client from "../ClientList/Client";
import Facture from "../Facture/Facture";
import Projects from "../Projets/Projects";
import { AppContext } from "../../components/Context";
import TaskScreen from "../tasks/taskScreen";
import PaiementScreen from "../Paiement/PaiementScreen";
import DevisScreen from "../Devis/DevisScreen";
import { useColor } from "../../components/color";
import HeaderApp from "./HeaderApp";

const Home: React.FC = () => {
  const { isDark } = useContext(AppContext)
  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK : useColor.BGCOLOR_WHITE;

  return (
    <Layout className="layout" style={{ background: BACKGROUND.backgroundColor }}>
      <HeaderApp />
      <Layout>
        <Sider style={{ background: 'lightBlue', height: "100h", position: "fixed", left: 0, top: 0, bottom: 0 }}>
          <SiderMenu />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content className="content" style={{ background: isDark ? "black" : "white" }}>
            <Routes>
              <Route path="*" element={<Dashboard />} />
              <Route path="/Client" element={<Client />} />
              <Route path="/Facture" element={<Facture />} />
              <Route path="/Projects" element={<Projects />} />
              <Route path="/Tasks" element={<TaskScreen />} />
              <Route path="/Paiements" element={<PaiementScreen />} />
              <Route path="/Devis" element={<DevisScreen />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      <FooterBar />
    </Layout>
  );
};

export default Home;
