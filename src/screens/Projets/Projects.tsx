import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Progress,
  Rate,
  Skeleton,
  Space,
  Tabs,
  Typography,
  Pagination,
} from "antd";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import ModalProject from "./ModalProject";
import { ADD_PROJECT, DELETE_PROJET, GETALL_PROJECT, UPDATE_PROJET } from "../../gql/projet";
import { useMutation, useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { AppContext } from "../../components/Context";
import { useColor } from "../../components/color";
import ProjetDetailModal from "./ModalDetailProject";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ProjectData {
  id_projet: number; 
  nom: string;
  description: string;
  dateDebut: string;
  dateEcheance: string;
  statut: string;
  id_client: string;
}

const Projects = () => {
  const { isDark } = useContext(AppContext);
  const [ modal2Open, setModal2Open ] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [ nom, setNom ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ dateDebut, setDateDebut ] = useState('');
  const [ dateEcheance, setDateEcheance ] = useState('');
  const [ statut, setStatut ] = useState('');
  const [ id_createur, setIdCreateur ] = useState('');
  const [ id_client, setIdClient ] = useState('');
  const [ searchText, setSearchText ] = useState('');
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ editingProject, setEditingProject ] = useState<ProjectData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [ visible, setVisible ] = useState(false);
  const [ item, setItem ] = useState(null)

  useEffect(() => {
    const getTokenAndDecode = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);   
          setIdCreateur(decodedToken.utilisateurId);   
        }
      } catch (error) { 
        console.log("Erreur lors de recuperation de l'id utilisateur", error);      
      } 
    }; 
    getTokenAndDecode(); 
  }, []);
  
  const [ addProjet, { loading: loadingProject, error: errorAdd }] = useMutation(ADD_PROJECT);
  const { data: projectData, refetch, loading: loadingQuery, error } = useQuery(GETALL_PROJECT, {
    variables: {
      page: currentPage - 1,
      pageSize: 6,
    },
  });

  useEffect(() => {
    if (projectData) {
      setTotalPages(projectData.projetAll.pageInfos.totalPages);
    }
  }, [projectData]);

  const [ deleteProjet , { loading: loadingDeleteProjet, error: errorDeleteProject }] = useMutation(DELETE_PROJET);
  const [ updateProjet, { loading: loadingUpdateProjet, error: errorUpdate }] = useMutation(UPDATE_PROJET);

  const filterItems = useMemo(() => {
    if (!projectData) {
      return [];
    }
    return projectData?.projetAll?.projetAll.filter(
      (item: { nom: string; description: string; }) =>
        item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [projectData, searchText]);

  const items: MenuProps["items"] = [
    {
      label: "Avec deadline",
      key: "0",
    },
    {
      label: "A long terme",
      key: "1",
    },
  ];

  const handleSubmit = async() => {
    if(nom === "" || id_createur === "") return;
    try {
      await addProjet({
        variables: {
          nom: nom,
          description: description,
          dateDebut: dateDebut,
          dateEcheance: dateEcheance, 
          statut: statut ? statut : "0",
          id_createur: id_createur,
          id_client: id_client
        },
      });
      refetch();
      setModal2Open(false);
    } catch (error) {
      console.error("Error add project:", error); 
    } 
  }
 
  const editProjet = (item: any) => {
    setIsEditing(!isEditing); 
    setEditingProject({ ...item }); 
  }
  
  useEffect(() => {
    if (editingProject) {
      setNom(editingProject.nom); 
      setDescription(editingProject.description);  
      setDateDebut(editingProject.dateDebut); 
      setDateEcheance(editingProject.dateEcheance); 
      setStatut(editingProject.statut); 
      setIdClient(editingProject.id_client);
    }
  }, [editingProject]);

  const handleEditing = async() => {
    if (!isEditing) return;
    try {
      await updateProjet({
        variables: {
          id_projet: editingProject?.id_projet, 
          nom: nom || "", 
          description: description || "", 
          dateDebut: dateDebut || "", 
          dateEcheance: dateEcheance || "", 
          statut:  statut || "0", 
          id_client: id_client
        },
      });
      refetch();
      setIsEditing(false);
      setEditingProject(null); 
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  const deleteProject = (id_projet: number) => {
    Modal.confirm({
      title: "Êtes-vous vraiment sûr de vouloir supprimer ?",
      okText: "Oui",
      onOk: async () => {
        try {
          await deleteProjet({
            variables: {
              id_projet: id_projet, 
            },
          }); 
          refetch();
        } catch (error) { 
          console.error("Error deleting project:", error); 
        } 
      }, 
    }); 
  }

  const creatNewProject = () => {
    resetFormFields();
    setModal2Open(true);
  }

  const resetFormFields = () => {
    setNom("");
    setDescription("");
    setDateDebut("");
    setDateEcheance("");
    setStatut("");
  };

  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const viewDetail = (item: any) => {
    setItem(item);
    setVisible(!visible)
  }

  return (
    <Card
      title="Gestion des projets"
      style={{ marginTop: "20px", borderTop: "3px solid #3ba0e9", background: BACKGROUND.backgroundColor, color: COLOR.color }}
    >
      <Skeleton loading={loading}>
        <Search
          placeholder="Rechercher un projet"
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
                  title={item?.nom}
                  bordered={false}
                  style={{ 
                    display: 'flex', 
                    width: 290, 
                    border: "0.5px solid #cccccc", 
                    flexDirection: 'column', 
                    backgroundColor: BACKGROUND.backgroundColor,
                  }}
                >
                  <Space direction="horizontal" style={{ alignItems: 'center',  justifyContent: 'space-between'}}>
                    <small style={{ color: COLOR.color}}>
                      {truncateDescription(item?.description, 35)}
                    </small>
                    <small
                      onClick={()=> viewDetail(item)}
                      style={{ color: "#FF164D", fontSize: 14, alignSelf: 'flex-end' }}
                    >
                      En savoir plus
                      <AiOutlineArrowRight style={{ position: "absolute", marginTop: 6 }} />
                    </small>
                  </Space>
                  <Progress
                    percent={item.statut}
                    size="default"
                    style={{ width: "100%", marginTop: 5 }}
                    strokeColor="#EAB514"
                  />
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
                      onClick={() => deleteProject(item.id_projet)}
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
      <ProjetDetailModal visible={visible} setVisible={setVisible} item={item}/>
      <GoDiffAdded
        onClick={()=> creatNewProject()}
        style={{ width: 25, height: 25, margin: "10px" }} 
      /> 
      <Modal 
        title="Ajouter un nouveau projet" 
        visible={modal2Open} 
        onOk={() => handleSubmit()} 
        onCancel={() => setModal2Open(false)} 
      >
        <ModalProject
          nom={nom}
          setNom={setNom} 
          description={description} 
          setDescription={setDescription}
          statut={statut} 
          setStatut={setStatut} 
          id_createur={id_createur} 
          dateDebut={dateDebut} 
          setDateDebut={setDateDebut}
          dateEcheance={dateEcheance}
          setDateEcheance={setDateEcheance}
          id_client={id_client}
          setIdClient={setIdClient}
        />
      </Modal>
      <Modal 
        title="Modification d'un projet" 
        visible={isEditing} 
        onOk={() => handleEditing()} 
        onCancel={() => setIsEditing(false)} 
      >
        <ModalProject
          nom={nom}
          setNom={setNom} 
          description={description} 
          setDescription={setDescription}
          statut={statut} 
          setStatut={setStatut} 
          id_createur={id_createur} 
          dateDebut={dateDebut} 
          setDateDebut={setDateDebut}
          dateEcheance={dateEcheance}
          setDateEcheance={setDateEcheance}
          id_client={id_client}
          setIdClient={setIdClient}
        />
      </Modal>
    </Card>
  );
};

export default Projects;
