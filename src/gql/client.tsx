import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query
    clientsAll($page: Int!, $pageSize: Int!) {
      clientsAll(page: $page, pageSize: $pageSize) {
        clientsAll {
          id_client
          nom
          adresse
          email
          telephone
          autres
          projets{
            id_projet
            nom
            description
            dateDebut
            dateEcheance
            statut
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

export const DELETE_CLIENT = gql`
mutation DeleteClient($id_client: Int!) {
  deleteClient(id_client: $id_client)
}`;

export const ADD_CLIENT = gql`
  mutation AddClient($nom: String, $adresse: String, $email: String, $telephone: String, $autres: String) {
    addClient(nom: $nom, adresse: $adresse, email: $email, telephone: $telephone, autres: $autres){
      id_client
      nom
      adresse
      email
      telephone
      autres
    }
  }
`;

export const UPDATE_CLIENT = gql` 
  mutation updateClient($id_client: Int!, $nom: String , $adresse: String, $email: String, $telephone: String, $autres: String) {
    updateClient(id_client: $id_client, nom: $nom, adresse: $adresse, email: $email, telephone: $telephone, autres: $autres){
      id_client
      nom
      adresse
      email
      telephone
      autres
    }
  }
`;