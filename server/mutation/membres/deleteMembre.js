const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteMembre(parent, args) {
  try {
    const { id_membre } = args;

    const membre = await prisma.membres.findUnique({
      where: { id_membre },
    });
    if (!membre) {
      throw new GraphQLError("Membre non trouvé");
    }

    await prisma.assignations.deleteMany({
        where: { id_membre },
    });

    await prisma.membres.deleteMany({
        where: { id_membre },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression de membre");
  }
}

module.exports = { deleteMembre };
