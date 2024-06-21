import  { useState } from 'react';
import { Modal, Button, Descriptions, Divider, Tag, Table } from 'antd';
import { useQuery } from '@apollo/client';

const ProjetDetailModal = ({ visible, setVisible, item}:any) => {

  const closeModal = () => {
    setVisible(false);
  };

  // Colonnes pour le tableau des tâches
  const columnsTaches = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
    },
    {
      title: 'Date de debut',
      dataIndex: 'dateDebut',
      key: 'dateDebut',
    },
    {
      title: 'Priorité',
      dataIndex: 'priorite',
      key: 'priorite',
    },
  ];

  return (
      <Modal
        title="Détails du Projet"
        visible={visible}
        onCancel={closeModal}
        footer={[
          <Button key="fermer" onClick={closeModal}>
            Fermer
          </Button>,
        ]}
      >
            <Descriptions title="Informations Générales">
              <Descriptions.Item label="Nom">{item?.nom} </Descriptions.Item>
              <Descriptions.Item label="Description">{item?.description}</Descriptions.Item>
              <Divider/>
              <Descriptions.Item label="Date de Début">{item?.dateDebut}</Descriptions.Item>
              <Descriptions.Item label="Date d'Échéance">{item?.dateEcheance}</Descriptions.Item>
              <Descriptions.Item label="Taux d'avancement">{item?.statut}%</Descriptions.Item>
            </Descriptions>
            <Divider />

            <Descriptions title="Tâches associées"></Descriptions>
            <Table columns={columnsTaches} dataSource={item?.taches} />
      </Modal>
  );
};

export default ProjetDetailModal;



