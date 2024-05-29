const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateAssignation = async (parent, args, context) => {
  try {
    const {
      id_assignation,
      id_projet,
      id_membre,
      role,
      autres,
    } = args;

    // Vérifier si l'utilisateur est authentifié
    const utilisateurId = await autorisation(context.token);
    if (utilisateurId === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    let dataToUpdate = {
      id_projet,
      id_membre,
      role,
      autres,
    };

    let updateAssignation;

    updateAssignation = await prisma.assignations.update({
      where: {
        id_assignation
      },
      data: dataToUpdate
    });

    return updateAssignation;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("Erreur de modification d'assignation");
  }
};

module.exports = { updateAssignation };
