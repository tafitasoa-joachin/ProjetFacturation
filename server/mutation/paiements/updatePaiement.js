const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updatePaiement = async (parent, args, context) => {
  try {
    const {
      id_paiement,
      id_facture, montant, datePaiement, autres
    } = args;

    // Vérifier si l'utilisateur est authentifié
    const utilisateurId = await autorisation(context.token);
    if (utilisateurId === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    let dataToUpdate = {
        id_facture, montant, datePaiement, autres
    };

    let updatePaiement;

    updatePaiement = await prisma.paiements.update({
        where: {
            id_paiement
        },
        data: dataToUpdate
    });
    
    return updatePaiement;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de paiement");
  }
};

module.exports = { updatePaiement };
