const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateTache = async (parent, args, context) => {
  try {
    const {
      id_tache,
      id_projet, nom, description, dateDebut, dateEcheance, priorite, statut, autres
    } = args;

    // Vérifier si l'utilisateur est authentifié
    // const utilisateurId = await autorisation(context.token);
    // if (utilisateurId === 0) {
    //   return new GraphQLError(constantes.CONNECTION_REFUSE);
    // }

    let dataToUpdate = {
        id_projet, nom, description, dateDebut, dateEcheance, priorite, statut, autres
    };

    let updateTache;

    updateTache = await prisma.taches.update({
        where: {
            id_tache
        },
        data: dataToUpdate
    });
    
    return updateTache;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de tache");
  }
};

module.exports = { updateTache };
