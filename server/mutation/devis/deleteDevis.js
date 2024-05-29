const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteDevis(parent, args) {
  try {
    const { id_devis } = args;

    const devi = await prisma.devis.findUnique({
      where: { id_devis },
    });

    if (!devi) {
      throw new GraphQLError("Devis non trouvé");
    }

    await prisma.elementDevis.deleteMany({
      where: { id_devis },
    });

    await prisma.factures.deleteMany({
      where: { id_devis },
    });

    await prisma.devis.deleteMany({
      where: { id_devis },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression du devis");
  }
}

module.exports = { deleteDevis };
