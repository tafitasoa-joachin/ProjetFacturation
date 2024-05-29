const { autorisation } = require('../verifierAuth');
const { PrismaClient } = require('@prisma/client');
const constantes = require('../../../constantes'); 
const { GraphQLError } = require('graphql');
const { Client } = require('../redis');

const prisma = new PrismaClient();

async function deconnexion(parent, args, context) {
  try {
    const { utilisateurId } = context; 
    
    // Vérifier si l'utilisateur est authentifié
    const utilisateur = await autorisation(context.token);
    if (utilisateur === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    if (utilisateur) {
      await Client.del(utilisateurId);
    //   console.log('Utilisateur déconnecté :', utilisateurId);
    }

    return  {        
                success: true ,
                message :constantes.UTILISATEUR_DECONNECTER
            };
  } catch (error) {
    // console.error('Erreur de déconnexion :', error);
    throw new Error(constantes.ERREUR_LORS_DE_LA_DECONNECTION);
  }
}

module.exports = { deconnexion };
