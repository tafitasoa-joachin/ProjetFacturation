import { useQuery } from "@apollo/client";
import { Form, Input, Select } from "antd";
import React, { useMemo, useState } from "react";
import { GET_CLIENTS } from "../../gql/client";
const { Option } = Select;

interface ClientData {
    id_client: number; 
    nom: string; 
    adresse: string; 
    email: string; 
    telephone: string;
    autres: string;
}

const ModalProject = ({         
    nom,
    setNom,
    description,
    setDescription,
    dateDebut,
    setDateDebut,
    dateEcheance,
    setDateEcheance,
    statut,
    setStatut,
    id_client,
    setIdClient
}: any) => {
    const [ search, setSearch ] = useState<string>("");
    const { loading, error, refetch , data: clientData } = useQuery(
        GET_CLIENTS,
        {
          variables: {
            page: 0,
            pageSize: 100
          }
        }
    ); 

    const filterItems = useMemo(() => {
        if (!clientData) {
          return [];
        }
        return clientData?.clientsAll?.clientsAll.filter(
          (item: ClientData) =>
            item.nom.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.telephone.toLowerCase().includes(search.toLowerCase())
        );
    }, [clientData, search]);

    const handleChangeIdClient = (value: string) => {
        setIdClient(value);
    };

  return (
    <div>
        <Form.Item label="Nom du projet">
            <Input value={nom} onChange={(e) => setNom(e.target.value)} />
        </Form.Item>
        <Form.Item label="Description">
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item label="Le taux d'avancement">
            <Input type="number" value={statut} onChange={(e) => setStatut(e.target.value)} />
        </Form.Item>
        <Form.Item label="Date de debut">
            <Input type="date" style={{ width: "100%" }} value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
        </Form.Item>
        <Form.Item label="Date d'echeance">
            <Input type="date" style={{ width: "100%" }} value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />
        </Form.Item>
        <Form.Item label="Client associé">
            <Select
                defaultValue={''}
                value={id_client}
                style={{ marginRight: 16}}
                onChange={handleChangeIdClient}
            >
                {filterItems.map((item: any, index: any) => {
                    return(
                        <Option value={item.id_client} key={index}>{item.nom}</Option>
                    );
                })}
            </Select>
        </Form.Item>
    </div>
  );
};

export default ModalProject;
