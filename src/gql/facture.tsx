import { gql } from "@apollo/client";

export const ADD_FACTURE = gql`
    mutation addFacture(
        $id_projet: Int
        $id_devis: Int
        $dateCreation: String
        $montantTotal: Int
        $statut: String
        $autres: String
    ){
        addFacture(
            id_projet: $id_projet, 
            id_devis: $id_devis, 
            dateCreation: $dateCreation, 
            montantTotal: $montantTotal, 
            statut: $statut, 
            autres: $autres
        ){
            id_facture
            dateCreation
            montantTotal
            statut
            autres
        }
    }
`;

export const UPDATE_FACTURE = gql`
    mutation updateFacture(
        $id_facture: Int!
        $id_projet: Int
        $id_devis: Int
        $dateCreation: String
        $montantTotal: Int
        $statut: String
        $autres: String
    ){
        updateFacture(
            id_facture: $id_facture,
            id_projet: $id_projet, 
            id_devis: $id_devis, 
            dateCreation: $dateCreation, 
            montantTotal: $montantTotal, 
            statut: $statut, 
            autres: $autres
        ){
            id_facture
            dateCreation
            montantTotal
            statut
            autres
        }
    }
`;

export const DELETE_FACTURE = gql`
    mutation deleteFacture($id_facture: Int!){
        deleteFacture(id_facture: $id_facture)
    }
`;

export const GETALL_FACTURE = gql`
    query facturesAll($page: Int!, $pageSize: Int!){
        facturesAll(page: $page, pageSize: $pageSize){
            facturesAll {
                id_facture
                dateCreation
                montantTotal
                statut
                autres
                projet {
                    id_projet
                    nom
                    description
                    dateDebut
                    dateEcheance
                    statut
                    createur {
                        id_utilisateur
                        nom
                        prenom
                        email
                    }
                    client{
                        id_client
                        nom
                        adresse
                        email
                        telephone
                        autres
                    }
                }
                devis {
                    id_devis
                    montantTotal
                    statut
                }
                paiements {
                    id_paiement
                    montant
                    datePaiement
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