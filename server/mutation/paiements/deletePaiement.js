const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deletePaiement(parent, args) {
  try {
    const { id_paiement } = args;

    const paiement = await prisma.paiements.findUnique({
      where: { id_paiement },
    });
    if (!paiement) {
      throw new GraphQLError("Paiement non trouvé");
    }
    await prisma.paiements.deleteMany({
        where: { id_paiement },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression de paiement");
  }
}

module.exports = { deletePaiement };
