import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
    mutation addProjet( 
        $nom: String
        $description: String
        $dateDebut: String
        $dateEcheance: String
        $statut: String
        $id_createur: String
        $id_client: Int!
    ){
        addProjet(
            nom: $nom,
            description: $description,
            dateDebut:  $dateDebut,
            dateEcheance: $dateEcheance,
            statut: $statut,
            id_createur: $id_createur,
            id_client: $id_client
        ){
            nom
            description
            dateDebut
            dateEcheance
            statut
        }
    }
`;

export const GETALL_PROJECT = gql`
    query
        projetAll($page: Int!, $pageSize: Int!){
            projetAll(page: $page, pageSize: $pageSize){
                projetAll{
                    id_client
                    id_projet
                    nom
                    description
                    dateDebut
                    dateEcheance
                    statut
                    autres
                    taches {
                        id_tache
                        nom
                        description
                        dateDebut
                        dateEcheance
                        priorite
                        statut
                        autres
                    }
                    devis {
                        id_devis
                        montantTotal
                        statut
                    }
                    factures {
                        id_facture
                        dateCreation
                        montantTotal
                        statut
                        autres
                    }
                    assignations {
                        id_assignation
                        role
                        autres
                    }
                }
                pageInfos {
                    pageActuelle
                    totalPages
                    nombreCountTotal
                    tailleDePage
                }
            }
        }
`;

export const GETALL_PROJECT_FILTER = gql`
    query
    projetFilter(
            $dateDebut: String!,
            $dateEcheance: String!,
            $statut: String!,
            $page: Int!, 
            $pageSize: Int!
        ){
            projetFilter(
                dateDebut: $dateDebut,
                dateEcheance: $dateEcheance,
                statut: $statut,
                page: $page, 
                pageSize: $pageSize
            ){
                projetAll{
                    id_projet
                    nom
                    description
                    dateDebut
                    dateEcheance
                    statut
                    autres
                    taches {
                        id_tache
                        nom
                        description
                        dateDebut
                        dateEcheance
                        priorite
                        statut
                        autres
                    }
                    devis {
                        id_devis
                        montantTotal
                        statut
                    }
                    factures {
                        id_facture
                        dateCreation
                        montantTotal
                        statut
                        autres
                    }
                    assignations {
                        id_assignation
                        role
                        autres
                    }
                }
                pageInfos {
                    pageActuelle
                    totalPages
                    nombreCountTotal
                    tailleDePage
                }
            }
        }
`;


export const DELETE_PROJET = gql`
    mutation deleteProjet($id_projet: Int!){
        deleteProjet(id_projet: $id_projet)
    }
`;

export const UPDATE_PROJET = gql`
    mutation updateProjet( 
        $id_projet: Int!,     
        $nom: String,
        $description: String,
        $dateDebut:  String,
        $dateEcheance: String,
        $statut: String
        $id_client: Int!
    ){
        updateProjet(
            id_projet: $id_projet,     
            nom: $nom,
            description: $description,
            dateDebut: $dateDebut,
            dateEcheance: $dateEcheance,
            statut: $statut
            id_client: $id_client
        ){
            id_projet     
            nom
            description
            dateDebut
            dateEcheance
            statut
        }
    }
`;