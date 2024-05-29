const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteFacture(parent, args) {
  try {
    const { id_facture } = args;

    const facture = await prisma.factures.findUnique({
      where: { id_facture },
    });
    if (!facture) {
      throw new GraphQLError("Facture non trouvé");
    }

    await prisma.paiements.deleteMany({
        where: { id_facture },
    });

    await prisma.factures.deleteMany({
        where: { id_facture },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression de Facture");
  }
}

module.exports = { deleteFacture };
