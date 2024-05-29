import { useQuery } from "@apollo/client";
import { Form, Input, Select } from "antd";
import React, { useMemo, useState } from "react";
import { GET_CLIENTS } from "../../gql/client";
import { GETALL_PROJECT } from "../../gql/projet";
const { Option } = Select;

interface TaskData {
    id_projet: number,
    nom: string,
    description: string,
    dateDebut: string,
    dateEcheance: string,
    priorite: string,
    statut: string,
}

const TaskModal = ({         
    id_projet,
    setIdProjet,
    nom,
    setNom,
    description,
    setDescription,
    dateDebut,
    setDateDebut,
    dateEcheance,
    setDateEcheance,
    priorite,
    setPriorite,
    statut,
    setStatut,
}: any) => {
    const [ search, setSearch ] = useState<string>("");
    const {  data: projectData, loading: loadingQueryProject, error: errorProject } = useQuery(GETALL_PROJECT, {
        variables: {
          page: 0,
          pageSize: 100
        }
    });

    const filterItems = useMemo(() => {
        if (!projectData) {
          return [];
        }
        return projectData?.projetAll?.projetAll.filter(
          (item: {nom: string; description: string;}) =>
            item.nom.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()) 
        );
    }, [projectData, search]);

    const handleChangeLangue = (value: string) => {
        setIdProjet(value);
    };

  return (
    <div>
        <Form.Item label="Nom">
            <Input value={nom} onChange={(e) => setNom(e.target.value)} />
        </Form.Item>
        <Form.Item label="Description">
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item label="Date de debut">
            <Input type="date" style={{ width: "100%" }} value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
        </Form.Item>
        <Form.Item label="Date d'echeance">
            <Input type="date" style={{ width: "100%" }} value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />
        </Form.Item>
        <Form.Item label="Priorité">
            <Input style={{ width: "100%" }} value={priorite} onChange={(e) => setPriorite(e.target.value)} />
        </Form.Item>
        <Form.Item label="Statut">
            <Input style={{ width: "100%" }} value={statut} onChange={(e) => setStatut(e.target.value)} />
        </Form.Item>
        <Form.Item label="Projet associé">
            <Select
                defaultValue={''}
                value={id_projet}
                style={{ marginRight: 16}}
                onChange={handleChangeLangue}
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

export default TaskModal;
