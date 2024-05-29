const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteAssignation(parent, args) {
  try {
    const { id_assignation } = args;

    const assignation = await prisma.assignations.findUnique({
      where: { id_assignation },
    });
    if (!assignation) {
      throw new GraphQLError("Assignation non trouvé");
    }

    await prisma.assignations.deleteMany({
      where: { id_assignation },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression d'assignation");
  }
}

module.exports = { deleteAssignation };
