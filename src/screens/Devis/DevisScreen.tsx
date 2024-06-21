import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Input,
  Modal,
  Skeleton,
  Pagination,
} from "antd";
import { useMutation, useQuery } from '@apollo/client';
import { AppContext } from '../../components/Context';
import { useColor } from '../../components/color';
import { GoDiffAdded } from 'react-icons/go';
import ModalDevis from './ModalDevis';
import { DeleteOutlined, EditOutlined, RetweetOutlined } from '@ant-design/icons';
import {  ADD_DEVIS, DELETE_DEVIS, GETALL_DEVIS, UPDATE_DEVIS } from '../../gql/devis';

interface DevisData {
  id_devis: number;
  montantTotal: number;
  statut: string;
  id_projet: string;
}

function DevisScreen() {
  const { isDark } = useContext(AppContext);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ modal2Open, setModal2Open ] = useState<boolean>(false);
  const [ searchText, setSearchText ] = useState('');
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ editingDevis, setEditingDevis ] = useState<DevisData | null>(null);
  const [ montantTotal, setMontantTotal ] = useState(0);
  const [ id_projet, setIdProjet ] = useState("");
  const [ statut, setStatut ] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data: devisData, refetch, loading: loadingQuerySdevis, error: errorDevis } = useQuery(GETALL_DEVIS, {
    variables: {
      page: currentPage - 1,
      pageSize: 6,
    },
  });
  const [ deleteDevis, { loading: loadingDeleteDevis, error: errorDeleteDevis }] = useMutation(DELETE_DEVIS);
  const [ addDevis, { loading: loadingDevis, error: errorAdd }] = useMutation(ADD_DEVIS);
  const [ updateDevis, { loading: loadingUpdateProjet, error: errorUpdate }] = useMutation(UPDATE_DEVIS);


  const filterItems = useMemo(() => {
    if (!devisData) {
      return [];
    }
    return devisData?.devisAll?.devisAll.filter(
      (item: { montantTotal: number; statut: string; }) =>
        item.montantTotal.toString().includes(searchText.toLowerCase()) ||
        item.statut.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [devisData, searchText]);

  const handleSubmit = async() => {
    if(montantTotal == 0) return;
    try {
      await addDevis({
        variables: {
          id_projet: id_projet,
          montantTotal: montantTotal ? montantTotal : 0,
          statut: statut ? statut : "En attente"
        }
      })
      refetch();
      setModal2Open(false);
    } catch (error) {
      console.error("Error add devis:", error); 
    } 
  }

  const deleteProject = (id_devis: number) => {
    Modal.confirm({
      title: "Êtes-vous vraiment sûr de vouloir supprimer ?",
      okText: "Oui",
      onOk: async () => {
        try {
          await deleteDevis({
            variables: {
              id_devis: id_devis, 
            },
          }); 
          refetch();
        } catch (error) { 
          console.error("Error deleting devis:", error); 
        } 
      }, 
    }); 
  }
 
  const editProjet = (item: any) => {
    setIsEditing(!isEditing); 
    setEditingDevis({ ...item }); 
  }
  
  useEffect(() => {
    if (editingDevis) {
      setMontantTotal(editingDevis.montantTotal);
      setStatut(editingDevis.statut);
      setIdProjet(editingDevis.id_projet);
    }
  }, [editingDevis]);

  const handleEditing = async() => {
    if (!isEditing) return;
    try {
      await updateDevis({
        variables:  {
          id_devis: editingDevis?.id_devis,
          montantTotal: montantTotal ? montantTotal : 0,
          statut: statut ? statut : "En attente"
        }
      });
      refetch();
      setIsEditing(false);
      setEditingDevis(null);
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  const creatNewProject = () => {
    resetFormFields();
    setModal2Open(true);
  }

  const resetFormFields = () => {
    setMontantTotal(0);
    setStatut("");
  };

  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    if (devisData) {
      setTotalPages(devisData.devisAll.pageInfos.totalPages);
    }
  }, [devisData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  return (
    <Card
      title="Gestion des devis"
      style={{ marginTop: "20px", borderTop: "3px solid #3ba0e9", background: BACKGROUND.backgroundColor, color: COLOR.color }}
    >
      <Skeleton loading={loading}>
        <Search
          placeholder="Rechercher un devis"
          onSearch={onSearch}
          enterButton
          style={{ width: "20.2rem", marginBottom: 20 }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {
            filterItems.map((item: any, index: any) => {
              return(
                <Card
                  key={index}
                  title={`${item?.montantTotal} Ar`}
                  bordered={false}
                  style={{ 
                    display: 'flex', 
                    width: 280, 
                    border: "0.5px solid #cccccc", 
                    flexDirection: 'column', 
                    backgroundColor: BACKGROUND.backgroundColor,
                  }}
                >
                  <small style={{ color: COLOR.color}}>{item.statut}</small>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15}}>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      style={{ backgroundColor: 'green' }}
                      onClick={() =>  {editProjet(item);}}
                    >
                      Modifier
                    </Button>
                    <Button
                      type="primary"
                      icon={<DeleteOutlined />}
                      style={{ backgroundColor: 'red'}}
                      onClick={() => deleteProject(item.id_devis)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </Card>
              );
            })
          }
        </div>
        <Pagination
          current={currentPage}
          total={totalPages * 6}
          pageSize={6}
          onChange={handlePageChange}
          style={{ marginTop: 20, textAlign: "right" }}
        />
      </Skeleton>
      <GoDiffAdded
        onClick={()=> creatNewProject()}
        style={{ width: 25, height: 25, margin: "10px" }} 
      /> 

      <Modal 
        title="Ajouter un nouveau devis" 
        visible={modal2Open} 
        onOk={() => handleSubmit()} 
        onCancel={() => setModal2Open(false)} 
      >
        <ModalDevis
          id_projet={id_projet}
          setIdProjet={setIdProjet}
          montantTotal={montantTotal}
          setMontantTotal={setMontantTotal}
          statut={statut}
          setStatut={setStatut}
        />
      </Modal>
      <Modal 
        title="Modification d'un devis" 
        visible={isEditing} 
        onOk={() => handleEditing()} 
        onCancel={() => setIsEditing(false)} 
      >
        <ModalDevis
          id_projet={id_projet}
          setIdProjet={setIdProjet}
          montantTotal={montantTotal}
          setMontantTotal={setMontantTotal}
          statut={statut}
          setStatut={setStatut}
        />
      </Modal>
    </Card>
  )
}

export default DevisScreen