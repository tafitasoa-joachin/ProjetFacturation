import { Button, Modal } from "antd";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const DescriptionModals = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h5
        onClick={() => setOpen(true)}
        style={{ textAlign: "end", color: "#FF164D" }}
      >
        En savoir plus{" "}
        <AiOutlineArrowRight style={{ position: "absolute", margin: 5 }} />
      </h5>

      <Modal
        title="LoveCoder"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>
          LoveCoder est un projet créé pour faciliter la rencontre entre des
          Employeur et des societés ou personnels qui a envie de realiser ces
          projets.Par contre, si un personne cherche un emplois qui correspond à sa
          profil, LoveCoder est là pour vous.
        </p>
      </Modal>
    </div>
  );
};

export default DescriptionModals;
