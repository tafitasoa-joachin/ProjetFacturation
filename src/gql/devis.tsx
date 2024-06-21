import { gql } from "@apollo/client";

export const ADD_DEVIS = gql`
    mutation addDevis(
        $id_projet: Int
        $montantTotal: Int
        $statut: String
    ){
        addDevis(
            id_projet: $id_projet, 
            montantTotal: $montantTotal, 
            statut: $statut
        ){
            id_devis
        }
    }
`;

export const GETALL_DEVIS = gql`
    query devisAll($page: Int!, $pageSize: Int!){
        devisAll(page: $page, pageSize: $pageSize){
            devisAll {
                id_devis
                id_projet
                montantTotal
                statut
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

export const UPDATE_DEVIS = gql`
    mutation updateDevis(
        $id_devis: Int!
        $montantTotal: Int
        $statut: String
    ){
        updateDevis(
            id_devis: $id_devis,
            montantTotal: $montantTotal,
            statut: $statut
        ){
            id_devis
            id_projet
            montantTotal
            statut
        }
    }
`;

export const DELETE_DEVIS = gql`
    mutation deleteDevis($id_devis: Int!){
        deleteDevis(id_devis: $id_devis)
    }
`;