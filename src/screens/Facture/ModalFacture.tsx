import { useQuery } from "@apollo/client";
import { Form, Input, Select } from "antd";
import React, { useMemo, useState } from "react";
import { GETALL_PROJECT } from "../../gql/projet";
import { GETALL_DEVIS } from "../../gql/devis";
const { Option } = Select;

const ModalFacture = ({ 
  id_projet, 
  setIdProjet, 
  id_devis, 
  setIdDevis, 
  dateCreation, 
  setDateCreation, 
  montantTotal, 
  setMontantTotal,
  statut, setStatut,
  autres, setAutres
}: any) => {

  const [ searchText, setSearchText ] = useState('');
  const { data: projectData, refetch, loading: loadingQuery, error } = useQuery(GETALL_PROJECT, {
      variables: {
        page: 0,
        pageSize: 200,
      },
  });
  const { data: devisData, loading: loadingQuerySdevis, error: errorDevis } = useQuery(GETALL_DEVIS, {
    variables: {
      page: 0,
      pageSize: 200,
    },
  });

  const filterItems = useMemo(() => {
    if (!projectData) {
      return [];
    }
    return projectData?.projetAll?.projetAll.filter(
      (item: { id_projet: number; nom: string; description: string; }) =>
        item.id_projet.toString().includes(searchText.toLowerCase()) ||
        item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [projectData, searchText]);

  
  const handleChangeStatut = (value: string) => {
      setStatut(value);
  };

  const handleChangeIdProjet = (value: string) => {
      setIdProjet(value);
  }
  const handleChangeIdDevis = (value: string) => {
    setIdDevis(value);
  }
  return (
    <div>
      <Form.Item label="Date de création du facture">
        <Input type="date" style={{ width: "100%" }} value={dateCreation} onChange={(e) => setDateCreation(e.target.value)} />
      </Form.Item>
      <Form.Item label="Montant total">
        <Input type="number" value={montantTotal} onChange={(e) => setMontantTotal(parseInt(e.target.value))} />
      </Form.Item>
      <Form.Item label="Statut">
        <Select
          defaultValue={statut}
          value={statut}
          style={{ marginRight: 16}}
          onChange={handleChangeStatut}
        >
          <Option value="En attente">En attente</Option>
          <Option value="Approuvé">Approuvé</Option>
          <Option value="Réjeté">Réjeté</Option>
          <Option value="Autres">Autres</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Dévis associé">
        <Select
          value={id_devis}
          style={{ marginRight: 16}}
          onChange={handleChangeIdDevis}
        >
          {devisData?.devisAll?.devisAll.map((item: any, index: any) => {
            return(
                <Option value={item.id_devis} key={index}>{item.montantTotal}</Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Projet associé">
        <Select
          value={id_projet}
          style={{ marginRight: 16}}
          onChange={handleChangeIdProjet}
        >
          {filterItems.map((item: any, index: any) => {
            return(
                <Option value={item.id_projet} key={index}>{item.nom}</Option>
            );
          })}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ModalFacture;
