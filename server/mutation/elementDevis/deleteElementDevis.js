const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteElementDevis(parent, args) {
  try {
    const { id_elementDevis } = args;

    const elementDevi = await prisma.elementDevis.findUnique({
      where: { id_elementDevis },
    });
    if (!elementDevi) {
      throw new GraphQLError("Element de devis non trouvé");
    }

    await prisma.elementDevis.deleteMany({
        where: { id_elementDevis },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression de l'element de devis");
  }
}

module.exports = { deleteElementDevis };
