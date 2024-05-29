import { Form, Input } from "antd";
import React from "react";

const ModalForm = ({ nom, setNom, adresse, setAdresse, email, setEmail, phone, setPhone, autres, setAutres }: any) => {
  return (
    <div>
      <Form.Item label="Nom">
        <Input value={nom} onChange={(e) => setNom(e.target.value)} />
      </Form.Item>
      <Form.Item label="Adresse">
        <Input value={adresse} onChange={(e) => setAdresse(e.target.value)} />
      </Form.Item>
      <Form.Item label="E-mail">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </Form.Item>
      <Form.Item label="Téléphone">
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Item>
      <Form.Item label="Autres">
        <Input value={autres} onChange={(e) => setAutres(e.target.value)} />
      </Form.Item>
    </div>
  );
};

export default ModalForm;
