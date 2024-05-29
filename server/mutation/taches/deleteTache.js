const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteTache(parent, args) {
  try {
    const { id_tache } = args;

    const tache = await prisma.taches.findUnique({
      where: { id_tache },
    });
    if (!tache) {
      throw new GraphQLError("Tache non trouvé");
    }

    await prisma.taches.deleteMany({
        where: { id_tache },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression de tache");
  }
}

module.exports = { deleteTache };
