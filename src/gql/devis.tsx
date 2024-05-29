import { gql } from "@apollo/client";

export const ADD_DEVIS = gql`
    mutation addDevis($id_projet: Int, $montantTotal: Float, statut: String){
        addDevis(id_projet: $id_projet, montantTotal: $montantTotal, statut: $statut){
            id_devis
            id_projet
            statut
            montantTotal
            elementsDevis{
                id_elementDevis 
            }
            factures{
                id_facture 
            }
        }
    }
`;

export const GETALL_DEVIS = gql``;

export const UPDATE_DEVIS = gql``;

export const DELETE_DEVIS = gql``;