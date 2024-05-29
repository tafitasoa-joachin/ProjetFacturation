import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { useContext, useRef, useState } from "react";
import FactureCli from "./FactureCli";
import RecoveryFact from "./RecoveryFact";
import InvoiceFooter from "./InvoiceFooter";
import { BsFillPrinterFill } from "react-icons/bs";
import FilterClient from "./FlilterClient/FilterClient";
import { useReactToPrint } from "react-to-print";
import { AppContext } from "../../components/Context";
import { useColor } from "../../components/color";

const Facture = () => {
  const { isDark } = useContext(AppContext);
  const [inputArray, setInputArray] = useState([]);
  const [state, setState] = useState({ numFact: "", lib: "", prix: "" });
  const handleChange = (e: any) => {
    // e.preventDefault(e);
    setState({ ...state, [e.target.numFact]: e.target.value });
    setState({ ...state, [e.target.lib]: e.target.value });
    setState({ ...state, [e.target.prix]: e.target.value });
  };
  
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const Change = () => {
    setInputArray([...inputArray]);
    console.log(inputArray);
    console.log(state);
  };
  //DRAWER
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // PRINT FACTURE
  const [messageApi, contextHolder] = message.useMessage();

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => {
      messageApi.open({
        type: "success",
        content: "Impression avec succes",
      });
    },
  });

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK : useColor.BGCOLOR_WHITE;
  const BACKGROUND_FB = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  return (
    <div>
      <div style={{ display: "flex", backgroundColor: BACKGROUND.backgroundColor }}>
        <Card
          title="Géstion des facture"
          style={{
            marginTop: "20px",
            borderTop: "3px solid #3ba0e9",
            width: "650px",
            height: "320px",
            backgroundColor: BACKGROUND_FB.backgroundColor
          }}
        >
          <Form
            style={{ maxWidth: 1000, display: "flex", gap: "20px" }}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="N° Facture"
              rules={[{ required: true, message: "completer la fromulaire" }]}
            >
              <Input onChange={handleChange} value={state.numFact} /> <br />
            </Form.Item>
            <Form.Item
              label="Libelé"
              rules={[{ required: true, message: "completer la fromulaire" }]}
            >
              <Input onChange={handleChange} value={state.lib} /> <br />
            </Form.Item>
            <Form.Item
              label="Prix unitaire"
              rules={[{ required: true, message: "completer la fromulaire" }]}
            >
              <Input onChange={handleChange} value={state.prix} /> <br />
            </Form.Item>
          </Form>

          <Form
            style={{ maxWidth: 1000, display: "flex", gap: "20px" }}
            layout="vertical"
          >
            <Form.Item
              label="Condition de paiment"
              rules={[{ required: true, message: "completer la fromulaire" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Date">
              <Input type="date" style={{ width: "185px" }} />
            </Form.Item>
            <Form.Item
              label="Mode de paiment"
              rules={[{ required: true, message: "completer la fromulaire" }]}
            >
              <Select style={{ width: "185px" }}>
                <Select.Option value="ESPECE">Espéce</Select.Option>
                <Select.Option value="ESPECE">PayPal</Select.Option>
                <Select.Option value="CHEQUE">Chéque</Select.Option>
                <Select.Option value="BANQUE">Banque</Select.Option>
              </Select>
            </Form.Item>
          </Form>
          <div>
            <Button type="primary" htmlType="submit" onClick={Change}>
              Valider
            </Button>
            <Button style={{ marginLeft: "20px" }} onClick={showDrawer}>
              Voir facture
            </Button>
          </div>
        </Card>
        <FilterClient />
        <div>
          <Drawer
            title="Fermer"
            placement="right"
            onClose={onClose}
            open={open}
            size="large"
          >
            <Card title="FACTURE" ref={componentRef}>
              <Card
                style={{
                  width: 300,
                  border: "2px solid #3ba0e9",
                  borderRadius: "30px",
                }}
              >
                <Typography style={{ textAlign: "center" }}>
                  <Title level={5}>MADA CREATIVE AGENCY</Title>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Lot UV 178 Bis Miandrarivo
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Tananarive 101, Madagascar
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Mail: <a>madacreativeagency@gmail.com</a>
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Gérant: Ambina HARISON
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Tel: +261 33 09 193 89
                  </Typography.Paragraph>
                </Typography>
              </Card>
              <Image
                width={100}
                src="https://www.google.com/search?q=mada+creative+agency&rlz=1C1XXVF_frMG954MG963&sxsrf=APwXEdcin1-UfqCp5bREhSTqsnwqUc7LZQ:1686573581087&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiq572Z4L3_AhWhQkEAHQ9BA6UQ_AUoAXoECAEQAw&biw=1366&bih=578&dpr=1#imgrc=fFsFuBM5F8R8HM"
              />
              <Divider />
              <FactureCli />
              <RecoveryFact />
              <div style={{ marginTop: "40px" }}>
                <Typography>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    <strong>Arrétér a la somme de:</strong> un dollars
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    <strong>condition de réglement:</strong> par virement PayPal
                    au compte de <a href="/">madacreativeagency@gmail.com</a>
                  </Typography.Paragraph>
                </Typography>
              </div>
              <InvoiceFooter />
            </Card>
            <div style={{ margin: "50px" }}>
              {contextHolder}
              <Button
                style={{
                  padding: "5px",
                  alignItems: "center",
                  width: "120px",
                }}
                onClick={handlePrint}
              >
                {" "}
                <BsFillPrinterFill style={{ marginRight: "12px" }} /> Imprimer
              </Button>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Facture;
