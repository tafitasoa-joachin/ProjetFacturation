const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateMembre = async (parent, args, context) => {
  try {
    const {
      id_membre,
      nom, email, autres
    } = args;

    // Vérifier si l'utilisateur est authentifié
    const utilisateurId = await autorisation(context.token);
    if (utilisateurId === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    let dataToUpdate = {
        nom, email, autres
    };

    let updateMembre;

    updateMembre = await prisma.membres.update({
        where: {
            id_membre
        },
        data: dataToUpdate
    });
    
    return updateMembre;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur lors de modification de membre");
  }
};

module.exports = { updateMembre };
