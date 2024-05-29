import React, { useState } from "react";
import { Form, Input, Modal } from "antd";

const addUser = () => {
  const [ModalOpen, seModalOpen] = useState(false);
  return (
    <Modal open={ModalOpen} onCancel={() => seModalOpen(false)}>
      <Form>
        <Form.Item label={"Name"}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default addUser;
