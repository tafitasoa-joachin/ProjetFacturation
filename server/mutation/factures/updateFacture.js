const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateFacture = async (parent, args, context) => {
  try {
    const {
      id_facture,
      id_projet, id_devis, dateCreation, montantTotal, statut, autres
    } = args;

    // Vérifier si l'utilisateur est authentifié
    const utilisateurId = await autorisation(context.token);
    if (utilisateurId === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    let dataToUpdate = {
        id_projet, id_devis, dateCreation, montantTotal, statut, autres
    };


    let updateFacture;

    updateFacture = await prisma.factures.update({
        where: {
            id_facture
        },
        data: dataToUpdate
    });
    
    return updateFacture;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de facture");
  }
};

module.exports = { updateFacture };
