import React, { useMemo, useState, useEffect, useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Input, Modal, Table } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { GoDiffAdded } from "react-icons/go";
import ModalForm from "./ModalForm";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLIENT, DELETE_CLIENT, GET_CLIENTS, UPDATE_CLIENT } from "../../gql/client";
import { AppContext } from "../../components/Context";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useColor } from "../../components/color";
import { isDate } from "moment";
import { color } from "html2canvas/dist/types/css/types/color";

interface ClientData {
  id_client: number; 
  nom: string; 
  adresse: string; 
  email: string; 
  telephone: string;
  autres: string;
}

const Client: React.FC = () => {
  const { isDark } = useContext(AppContext);
  const [ modal2Open, setModal2Open ] = useState<boolean>(false);
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ search, setSearch ] = useState<string>("");
  const [ editingClient, setEditingClient ] = useState<ClientData | null>(null);

  const [ nom, setNom ] = useState<string>(""); 
  const [ adresse, setAdresse ] = useState<string>(""); 
  const [ email, setEmail ] = useState<string>(""); 
  const [ phone, setPhone ] = useState<string>(""); 
  const [ autres, setAutres ] = useState<string>(""); 

  const { loading, error, refetch , data: clientData } = useQuery(
    GET_CLIENTS,
    {
      variables: {
        page: 0,
        pageSize: 6
      }
    }
  ); 
  const [ deleteClient, {loading: loadingDelete, error: errorDelete } ] = useMutation(DELETE_CLIENT);
  const [ addClient, { loading: loadingClient, error: errorAdd }] = useMutation(ADD_CLIENT);
  const [ updateClient, { loading: loadingUpdate, error: errorUpdate}] = useMutation(UPDATE_CLIENT);

  const DeleteClient = (record: ClientData) => {
    Modal.confirm({
      title: "Êtes-vous vraiment sûr de vouloir supprimer ?",
      okText: "Oui",
      onOk: async () => {
        try {
          await deleteClient({
            variables: {
              id_client: record.id_client, 
            },
            // refetchQueries: [{ query: GET_CLIENTS }],
          }); 
          refetch()
        } catch (error) { 
          console.error("Error deleting client:", error); 
        } 
      }, 
    }); 
  };

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

  const columns = [
    {
      key: "2",
      title: "Nom",
      dataIndex: "nom",
    },
    {
      key: "4",
      title: "Adresse",
      dataIndex: "adresse",
    },
    {
      key: "5",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "6",
      title: "Téléphone",
      dataIndex: "telephone",
    },
    {
      key: "7",
      title: "Actions",
      render: (record: ClientData) => {
        return (
          <>
           <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ backgroundColor: 'green' }}
              onClick={() => {
                editClient(record);
              }}
            >
            </Button>
            <Button
              type="primary"
              icon={<MdDeleteOutline />}
              style={{ backgroundColor: 'red', marginLeft: 5 }}
              onClick={() => {
                DeleteClient(record)
              }}
            >
            </Button>
          </>
        );
      },
    },
  ];

  const editClient = (record: ClientData) => { 
    setIsEditing(true); 
    console.log(record);
    setEditingClient({ ...record }); 
  }; 
  

  // Synchronize form fields with the editingClient state when it changes
  useEffect(() => {
    if (editingClient) {
      setNom(editingClient.nom); 
      setAdresse(editingClient.adresse);  
      setEmail(editingClient.email); 
      setPhone(editingClient.telephone); 
      setAutres(editingClient.autres); 
    }
  }, [editingClient]);

  const creatNewClient = () => {
    resetFormFields();
    setModal2Open(true);
  };

  const resetFormFields = () => {
    setNom("");
    setAdresse("");
    setEmail("");
    setPhone("");
    setAutres("");
  };

  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleSubmit = async() => {
    if(nom =="" || email == "") return;
    try {
      await addClient({
        variables: {
          nom: nom,
          adresse: adresse,
          email: email,
          telephone: phone, 
          autres: autres
        },
        // refetchQueries: [{ query: GET_CLIENTS }],
      });
      refetch()
      setModal2Open(false);
    } catch (error) {
      console.error("Error add client:", error); 
    } 
  }

  const handleEditing = async() => {
    if (!editingClient) return;
    try {
      await updateClient({
        variables: {
          id_client: editingClient.id_client, 
          nom: nom || "", 
          adresse: adresse || "", 
          email: email || "", 
          telephone: phone || "", 
          autres:  autres || "", 
        },
        // refetchQueries: [{ query: GET_CLIENTS }],
      });
      refetch()
      setIsEditing(false);
      setEditingClient(null); // Reset editing client
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK

  return (
      <Card
        title="Gestion des clients"
        style={{ marginTop: "20px", borderTop: "3px solid #3ba0e9", background: BACKGROUND.backgroundColor, color: COLOR.color }}
      >
        <Search
          placeholder="Rechercher un client"
          onSearch={onSearch}
          enterButton
          style={{ width: "20.2rem", background: BACKGROUND.backgroundColor }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <Table
          bordered
          columns={columns}
          dataSource={filterItems}
          rowKey={(item) => item.id_client}
          style={{ marginTop: "20px", background: BACKGROUND.backgroundColor }}
        />

        <GoDiffAdded
          onClick={creatNewClient}
          style={{ width: 25, height: 25, margin: "10px" }}
        />

        <Modal
          title="Ajouter un nouveau client"
          visible={modal2Open}
          onOk={() => handleSubmit()}
          onCancel={() => setModal2Open(false)}
        >
          <ModalForm
            nom={nom}
            setNom={setNom}
            adresse={adresse}
            setAdresse={setAdresse}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            autres={autres}
            setAutres={setAutres}
          />
        </Modal>

        <Modal
          title="Modifier le client"
          visible={isEditing}
          onCancel={() => setIsEditing(false)}
          onOk={() => handleEditing()}
        >
          <ModalForm 
            nom={nom}
            setNom={setNom}
            adresse={adresse}
            setAdresse={setAdresse}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            autres={autres}
            setAutres={setAutres}
          />
        </Modal>
      </Card>
  );
};

export default Client;
