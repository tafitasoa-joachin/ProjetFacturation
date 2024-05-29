import {
  Badge,
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
} from "antd";

import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { useMutation, useQuery } from "@apollo/client";
import { AppContext } from "../../components/Context";
import { useColor } from "../../components/color";
import TaskModal from "./taskModal";
import { ADD_TASK, DELETE_TASK, GETTASK_ALL, UPDATE_TASK } from "../../gql/task";
import { unstable_HistoryRouter } from "react-router-dom";
import { GETALL_PROJECT } from "../../gql/projet";

interface TaskData {
  id_tache: number,
  id_projet: string,
  nom: string,
  description: string,
  dateDebut: string,
  dateEcheance: string,
  priorite: string,
  statut: string,
}

const TaskScreen = () => {
  const { isDark } = useContext(AppContext);
  const [ modal2Open, setModal2Open ] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [ id_projet, setIdProjet ] = useState('');
  const [ nom, setNom ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ dateDebut, setDateDebut ] = useState('');
  const [ dateEcheance, setDateEcheance ] = useState('');
  const [ priorite, setPriorite ] = useState('');
  const [ statut, setStatut ] = useState('');
  const [ searchText, setSearchText ] = useState('');
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ editingTask, setEditingTask ] = useState<TaskData | null>(null);

  const [ addTache, { loading: loadingAddTask, error: errorAdd }] = useMutation(ADD_TASK);
  const {  data: taskData, refetch, loading: loadingQuery, error } = useQuery(GETTASK_ALL, {
    variables: {
      page: 0,
      pageSize: 12
    }
  });

  const [ deleteTache , { loading: loadingDeleteTask, error: errorDeleteTask }] = useMutation(DELETE_TASK);
  const [ updateTache, { loading: loadingUpdateTask, error: errorUpdate }] = useMutation(UPDATE_TASK);

  const filterItems = useMemo(() => {
    if (!taskData) {
      return [];
    }
    return taskData?.tachesAll?.tachesAll.filter(
      (item: { nom: string; description: string; id_projet: number }) =>
        item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase()) || 
        item.id_projet.toString().includes(searchText.toLowerCase()) 
    );
  }, [taskData, searchText]);

  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const items: MenuProps["items"] = [
    {
      label: "Completées",
      key: "0",
    },
    {
      label: "A tester",
      key: "1",
    },
  ];

  const handleSubmit = async() => {
    if(nom == "" || id_projet == undefined  ) return;
    try {
      const task = await addTache({
        variables: {
          nom: nom, 
          description: description, 
          dateDebut: dateDebut, 
          dateEcheance: dateEcheance, 
          priorite: priorite, 
          statut: statut ? statut : "En attente", 
          id_projet: id_projet
        },
      });
      console.log(task);
      refetch()
      setModal2Open(false);
    } catch (error) {
      console.log("Error add task:", error); 
    } 
  }
 
  const editTask = (item: any) => {
    setIsEditing(!isEditing); 
    setEditingTask({ ...item }); 
  }
  
  useEffect(() => {
    if(editingTask){
      setIdProjet(editingTask.id_projet);
      setNom(editingTask.nom);
      setDescription(editingTask.description);
      setDateDebut(editingTask.dateDebut);
      setDateEcheance(editingTask.dateEcheance); 
      setPriorite(editingTask.priorite);
      setStatut(editingTask.statut);
    }
  }, [editingTask]);

  const handleEditing = async() => {
    if (!isEditing) return;
    try {
     
      await updateTache({
        variables: {
          id_tache: editingTask?.id_tache,
          id_projet: id_projet, 
          nom: nom || "", 
          description: description ||"", 
          dateDebut: dateDebut ||"", 
          dateEcheance: dateEcheance || "", 
          priorite: priorite || "", 
          statut: statut || "", 
          autres: "" 
        },
      });
      console.log(errorAdd);
      refetch()
      setIsEditing(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  const handledeleteProject = (id_tache: number) => {
    Modal.confirm({
      title: "Êtes-vous vraiment sûr de vouloir supprimer ?",
      okText: "Oui",
      onOk: async () => {
        try {
          await deleteTache({
            variables: {
              id_tache: id_tache, 
            },
          }); 
          refetch()
        } catch (error) { 
          console.error("Error deleting task:", error); 
        } 
      }, 
    }); 
  }

  const creatNewTask = () => {
    resetFormFields();
    setModal2Open(true);
  }

  const resetFormFields = () => {
    setIdProjet("");
    setNom("");
    setDescription("");
    setDateDebut("");
    setDateEcheance(""); 
    setPriorite("");
    setStatut("");
  };

  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  return (
    <div>
      <Tabs defaultActiveKey="tab1" onTabClick={showSkeleton}>
        <Tabs.TabPane tab="Tâches" disabled={loading} key="tab1">
          <Skeleton loading={loading}>
            <Search
              placeholder="Rechercher un tâche"
              onSearch={onSearch}
              enterButton
              style={{ width: "20.2rem", marginBottom: 20 }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {
                filterItems.map((item: any, index: any)=> {
                  return(
                  <Badge.Ribbon text="Autop" key={index}>
                    <Card 
                      title={item.nom} 
                      size="small" 
                      style={{ width: 200}}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, alignItems: "center"}}>
                        <small style={{ color: COLOR.color}}>
                          {truncateDescription(item?.description, 12)} 
                        </small>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", gap: 8}}>
                          <Button
                            type="primary"
                            icon={<EditOutlined />}
                            style={{ backgroundColor: 'green'}}
                            onClick={() => {editTask(item)}}
                          />
                          <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: 'red'}}
                            onClick={() => handledeleteProject(item.id_tache)}
                          />
                        </div>  
                      </div>
                    </Card>
                  </Badge.Ribbon>);
                })
              }
            </div>
          </Skeleton>
        </Tabs.TabPane>

        <Tabs.TabPane tab="En Cours" disabled={loading} key="tab2">
          <Skeleton loading={loading}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
    
            </div>
          </Skeleton>
        </Tabs.TabPane>

        <Tabs.TabPane tab="En attente" disabled={loading} key="tab3">
          <Skeleton loading={loading}>
            
          </Skeleton>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Space>
                selectioner
                <DownOutlined />
              </Space>
            </Dropdown>
          }
          key="tab4"
        ></Tabs.TabPane>
      </Tabs>

      <GoDiffAdded
        onClick={()=> creatNewTask()}
        style={{ width: 25, height: 25, margin: "10px" }} 
      /> 
      <Modal 
        title="Ajouter un nouveau tâche" 
        visible={modal2Open} 
        onOk={() => handleSubmit()} 
        onCancel={() => setModal2Open(false)} 
      >
        <TaskModal
          id_projet={id_projet}
          setIdProjet={setIdProjet}
          nom={nom}
          setNom={setNom}
          description={description}
          setDescription={setDescription}
          dateDebut={dateDebut}
          setDateDebut={setDateDebut}
          dateEcheance={dateEcheance}
          setDateEcheance={setDateEcheance}
          priorite={priorite}
          setPriorite={setPriorite}
          statut={statut}
          setStatut={setStatut}
        />
      </Modal>
      <Modal 
        title="Modification d'un tâche "
        visible={isEditing}  
        onOk={() => handleEditing()} 
        onCancel={() => setIsEditing(false)} 
      >
        <TaskModal
          id_projet={id_projet}
          setIdProjet={setIdProjet}
          nom={nom}
          setNom={setNom}
          description={description}
          setDescription={setDescription}
          dateDebut={dateDebut}
          setDateDebut={setDateDebut}
          dateEcheance={dateEcheance}
          setDateEcheance={setDateEcheance}
          priorite={priorite}
          setPriorite={setPriorite}
          statut={statut}
          setStatut={setStatut}
        />
      </Modal>
    </div>
  );
};
export default TaskScreen;

