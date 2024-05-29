const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateProjet = async (parent, args, context) => {
  try {
    const {
      id_projet,
      nom, description, dateDebut, dateEcheance, statut, id_createur, id_client, autres
    } = args;

    // Vérifier si l'utilisateur est authentifié
    // const utilisateurId = await autorisation(context.token);
    // if (utilisateurId === 0) {
    //   return new GraphQLError(constantes.CONNECTION_REFUSE);
    // }

    let dataToUpdate = {
        nom, description, dateDebut, dateEcheance, statut, id_createur, id_client, autres
    };

    let updateProjet;

    updateProjet = await prisma.projets.update({
        where: {
          id_projet
        },
        data: dataToUpdate
    });
    
    return updateProjet;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de projet");
  }
};

module.exports = { updateProjet };
