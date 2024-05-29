import { gql } from '@apollo/client';

export  const AUTH_USER = gql`
    mutation authentification($email: String!, $motDePasse: String!) {
        authentification(email: $email, motDePasse: $motDePasse) {
            token
        }
    }
`;

export const ADD_USER = gql`
    mutation addUtilisateur($nom: String!, $prenom: String!, $email: String!, $motDePasse: String!) {
        addUtilisateur(nom: $nom, prenom: $prenom, email: $email, motDePasse: $motDePasse) {
            nom
            prenom
            email
            motDePasse
        }
    }
`;

export const UTILISATEUR = gql`
  query utilisateurOne($id: String!) {
    utilisateurOne(id: $id) {
        id_utilisateur
        nom
        prenom
        email
    }
  }
`;