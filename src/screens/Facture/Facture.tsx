import React, { useMemo, useState, useEffect, useContext, useRef } from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Drawer, Input, Modal, Pagination, Table, Typography, message } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { GoDiffAdded } from "react-icons/go";
import ModalFacture from "./ModalFacture";
import { useMutation, useQuery } from "@apollo/client";
import { AppContext } from "../../components/Context";
import { useColor } from "../../components/color";
import { ADD_FACTURE, DELETE_FACTURE, GETALL_FACTURE, UPDATE_FACTURE } from "../../gql/facture";
import { useReactToPrint } from "react-to-print";
import { BsFillPrinterFill } from "react-icons/bs";
import Title from "antd/es/typography/Title";
import FactureCli from "./FactureCli";
import RecoveryFact from "./RecoveryFact";
import InvoiceFooter from "./InvoiceFooter";
const { Search } = Input;

interface FactureData {
  id_facture: number; 
  dateCreation: string;
  montantTotal: number;
  statut: string;
  projet: {
    // id_projet: number;
    nom: string;
    client: {
      nom: string;
      email: string;
    };
  };
  devis: {
    id_devis: number;
    montantTotal: number;
    statut: string;
  };
  paiements: {
    datePaiement: string;
  }[];
}

const Facture: React.FC = () => {
  const { isDark } = useContext(AppContext);
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [editingFacture, setEditingFacture] = useState<FactureData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ id_devis, setIdDevis ] = useState('');
  const [ dateCreation, setDateCreation ] = useState("");
  const [ montantTotal, setMontantTotal ] = useState(0);
  const [ id_projet, setIdProjet ] = useState("");
  const [ statut, setStatut ] = useState("");
  const [ autres, setAutres ] = useState('');
  const [state, setState] = useState({ numFact: "", lib: "", prix: "" });
  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { loading, error, refetch, data: factureData } = useQuery(
    GETALL_FACTURE,
    {
      variables: {
        page: currentPage - 1,
        pageSize: 6,
      },
    }
  );

  const [deleteFacture, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_FACTURE);
  const [addFacture, { loading: loadingFacture, error: errorAdd }] = useMutation(ADD_FACTURE);
  const [updateFacture, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_FACTURE);

  const DeleteFacture = (record: FactureData) => {
    Modal.confirm({
      title: "Êtes-vous vraiment sûr de vouloir supprimer ?",
      okText: "Oui",
      onOk: async () => {
        try {
          await deleteFacture({
            variables: {
              id_facture: record.id_facture,
            },
          });
          refetch();
        } catch (error) {
          console.error("Error deleting facture:", error);
        }
      },
    });
  };

  const filterItems = useMemo(() => {
    if (!factureData) {
      return [];
    }
    return factureData.facturesAll.facturesAll.filter(
      (item: FactureData) =>
        item.statut.toLowerCase().includes(search.toLowerCase()) ||
        item.montantTotal.toString().includes(search.toLowerCase()) ||
        item.id_facture.toString().includes(search.toLowerCase())
    );
  }, [factureData, search]);

  const columns = [
    {
      key: "1",
      title: "Nom du Client",
      dataIndex: ["projet", "client", "nom"],
    },
    {
      key: "2",
      title: "Email du Client",
      dataIndex: ["projet", "client", "email"],
    },
    {
      key: "3",
      title: "Nom du Projet",
      dataIndex: ["projet", "nom"],
    },
    {
      key: "4",
      title: "Montant du Devis",
      dataIndex: ["devis", "montantTotal"],
    },
    {
      key: "5",
      title: "Statut du Devis",
      dataIndex: ["devis", "statut"],
    },
    {
      key: "6",
      title: "Date de Paiement",
      dataIndex: ["paiements", "0", "datePaiement"],
      render: (datePaiement: string) => datePaiement || "N/A",
    },
    {
      key: "7",
      title: "Actions",
      render: (record: FactureData) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined style={{ fontSize: 15}}/>}
            style={{ backgroundColor: "green" }}
            onClick={() => editFacture(record)}
          />
          <Button
            type="primary"
            icon={<MdDeleteOutline style={{ fontSize: 15}} />}
            style={{ backgroundColor: "red", marginLeft: 5 }}
            onClick={() => DeleteFacture(record)}
          />
          <Button
            type="primary"
            icon={<EyeOutlined style={{ fontSize: 15}} />}
            style={{ marginLeft: 5 }}
            onClick={() => showDrawer(record)}
          />
        </>
      ),
    },
  ];

  const editFacture = (record: FactureData) => {
    setIsEditing(true);
    setEditingFacture({ ...record });
  };

  useEffect(() => {
    if (editingFacture) {
      setMontantTotal(editingFacture.montantTotal);
      setStatut(editingFacture.statut);
      setDateCreation(editingFacture.dateCreation);
    }
  }, [editingFacture]);

  const createNewFacture = () => {
    resetFormFields();
    setModal2Open(true);
  };

  const resetFormFields = () => {
    setMontantTotal(0);
    setStatut("");
    setIdProjet("");
    setIdDevis("");
    setDateCreation("");
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleSubmit = async () => {
    try {
      await addFacture({
        variables: {
          id_projet: id_projet, 
          id_devis: id_devis, 
          dateCreation: dateCreation, 
          montantTotal: montantTotal, 
          statut: statut, 
        },
      });
      refetch();
      setModal2Open(false);
    } catch (error) {
      console.error("Error adding facture:", error);
    }
  };

  const handleEditing = async () => {
    if (!editingFacture) return;
    try {
      await updateFacture({
        variables: {
          id_facture: editingFacture?.id_facture,
          id_projet: id_projet, 
          id_devis: id_devis, 
          dateCreation: dateCreation, 
          montantTotal: montantTotal, 
          statut: statut, 
        },
      });
      refetch();
      setIsEditing(false);
      setEditingFacture(null);
    } catch (error) {
      console.error("Error editing facture:", error);
    }
  };

  //DRAWER
  const [open, setOpen] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState<FactureData | null>(null);

  const showDrawer = (record: FactureData) => {
    setSelectedFacture(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedFacture(null);
  };

  // PRINT FACTURE
  const [messageApi, contextHolder] = message.useMessage();
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "facture-data",
    onAfterPrint: () => {
      messageApi.open({
        type: "success",
        content: "Impression avec succès",
      });
    },
  });

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  // N° facture, Date de facturation, point de vente(location), total, Montant à payer, contact client, action
  return (
    <Card
      title="Gestion des factures"
      style={{ marginTop: "20px", borderTop: "3px solid #3ba0e9", background: BACKGROUND.backgroundColor, color: COLOR.color }}
    >
      <Search
        placeholder="Rechercher une facture"
        onSearch={onSearch}
        enterButton
        style={{ width: "20.2rem", background: BACKGROUND.backgroundColor }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table
        bordered
        columns={columns}
        dataSource={filterItems}
        rowKey={(item) => item.id_facture}
        style={{ marginTop: "20px", background: BACKGROUND.backgroundColor }}
      />
      <GoDiffAdded
        onClick={createNewFacture}
        style={{ width: 25, height: 25, margin: "10px" }}
      />
      {/* Details facture */}
      <div>
        <Drawer
          title="Détails de la facture"
          placement="right"
          onClose={onClose}
          open={open}
          size="large"
        >
          {selectedFacture && (
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
              <Divider />
              <FactureCli client={selectedFacture?.projet?.client} dateCreation={selectedFacture?.dateCreation} id_facture={selectedFacture?.id_facture}/>
              <RecoveryFact />
              <div style={{ marginTop: "40px" }}>
                <Typography>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    <strong>Arrêté à la somme de:</strong> {selectedFacture.montantTotal} {selectedFacture.projet.nom}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    <strong>Conditions de règlement:</strong> par virement Paypal
                    au compte de <a href="/">madacreativeagency@gmail.com</a>
                  </Typography.Paragraph>
                </Typography>
              </div>
              <InvoiceFooter />
            </Card>
          )}
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
              <BsFillPrinterFill style={{ marginRight: "12px" }} /> Imprimer
            </Button>
          </div>
        </Drawer>
      </div>
      {/* fin de detail du facture */}
      <Modal
        title="Ajouter un nouveau facture"
        visible={modal2Open}
        onOk={handleSubmit}
        onCancel={() => setModal2Open(false)}
      >
        <ModalFacture 
          id_devis={id_devis}
          setIdDevis={setIdDevis}
          id_projet={id_projet}
          setIdProjet={setIdProjet}
          statut={statut}
          setStatut={setStatut}
          autres={autres} 
          setAutres={setAutres}
          montantTotal={montantTotal}
          setMontantTotal={setMontantTotal}
          dateCreation={dateCreation}
          setDateCreation={setDateCreation}
        />
      </Modal>

      <Modal
        title="Modifier le facture"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleEditing}
      >
        <ModalFacture 
          id_devis={id_devis}
          setIdDevis={setIdDevis}
          id_projet={id_projet}
          setIdProjet={setIdProjet}
          statut={statut}
          setStatut={setStatut}
          autres={autres} 
          setAutres={setAutres}
          montantTotal={montantTotal}
          setMontantTotal={setMontantTotal}
          dateCreation={dateCreation}
          setDateCreation={setDateCreation}
        />
      </Modal>
    </Card>
  );
};

export default Facture;
