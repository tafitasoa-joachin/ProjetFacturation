const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateElementDevis = async (parent, args, context) => {
  try {
    const {
      id_elementDevis,
      id_devis, description, prixUnitaire, quantite
    } = args;

    // Vérifier si l'utilisateur est authentifié
    const utilisateurId = await autorisation(context.token);
    if (utilisateurId === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    let dataToUpdate = {
        id_devis, description, prixUnitaire, quantite
    };


    let updateElementDevis;

    updateElementDevis = await prisma.elementDevis.update({
        where: {
            id_elementDevis
        },
        data: dataToUpdate
    });
    
    return updateElementDevis;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de l'element devis");
  }
};

module.exports = { updateElementDevis };
