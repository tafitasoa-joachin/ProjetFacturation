import { gql } from "@apollo/client";

export const GETTASK_ALL = gql`
query 
tachesAll($page: Int!, $pageSize: Int!) {
    tachesAll(page: $page, pageSize: $pageSize) {
        tachesAll {
            id_tache
            nom
            description
            dateDebut
            dateEcheance
            priorite
            statut
            id_projet
            nom_projet
            projet {
                id_projet
                nom_client
                nom
                description
                dateDebut
                dateEcheance
                dateAjout
                statut
            }
        }
        pageInfos {
            pageActuelle
            totalPages
            nombreCountTotal
            tailleDePage
        }
    }
}`;


export const ADD_TASK = gql`
    mutation AddTache(
        $id_projet: Int
        $nom : String
        $description: String
        $dateDebut: String
        $dateEcheance: String
        $priorite: String
        $statut: String
    ){ 
        addTache(
            id_projet: $id_projet, 
            nom: $nom, 
            description: $description, 
            dateDebut: $dateDebut, 
            dateEcheance: $dateEcheance, 
            priorite: $priorite, 
            statut: $statut, 
        ) {
            id_tache
            nom
            description
            statut
        }
    }
`;

export const UPDATE_TASK = gql`
mutation updateTache(
    $id_tache: Int!,
    $id_projet: Int, 
    $nom : String, 
    $description: String, 
    $dateDebut: String, 
    $dateEcheance: String, 
    $priorite: String, 
    $statut: String,
    $autres: String
) { 
    updateTache(
        id_tache: $id_tache,
        id_projet: $id_projet, 
        nom: $nom, 
        description: $description, 
        dateDebut: $dateDebut, 
        dateEcheance: $dateEcheance, 
        priorite: $priorite, 
        statut: $statut, 
        autres: $autres 
    ) {
        id_tache
        nom
        description
        dateDebut
        dateEcheance
        priorite
        statut
        autres
        id_projet
    }
}
`;

export const DELETE_TASK = gql`
    mutation deleteTache($id_tache: Int!){
        deleteTache(id_tache: $id_tache)
    }
`;