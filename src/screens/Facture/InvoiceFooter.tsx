import React from "react";
import { Divider, Typography } from "antd";

const InvoiceFooter = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Divider />
      <Typography style={{ textAlign: "center" }}>
        <Typography.Paragraph>
          Mada Creative Agency- capital de: 100000 Ar Lot UV 178 Bis
          Miandrarivo, Tananarivo 101 Madagascar Tel: +261 33 09 193 89 - Mail :{" "}
          <a href="/">madacreativeagency@gmail.com</a> RC : 488930873 - STAT:
          5673800002
        </Typography.Paragraph>
      </Typography>
    </div>
  );
};

export default InvoiceFooter;
