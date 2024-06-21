const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateDevis = async (parent, args, context) => {
  try {
    const {
      id_devis,
      id_projet, montantTotal, statut, nom_projet
    } = args;

    // Vérifier si l'utilisateur est authentifié
    // const utilisateurId = await autorisation(context.token);
    // if (utilisateurId === 0) {
    //   return new GraphQLError(constantes.CONNECTION_REFUSE);
    // }

    let dataToUpdate = {
      id_projet, montantTotal, statut, nom_projet
    };

    let updateDevis;

    updateDevis = await prisma.devis.update({
      where: {
        id_devis: id_devis
      },
      data: dataToUpdate
    });
    
    return updateDevis;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de devis");
  }
};

module.exports = { updateDevis };
