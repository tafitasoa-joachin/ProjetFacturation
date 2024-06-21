const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteProjet(parent, args) {
  try {
    const { id_projet } = args;
    console.log(id_projet);

    const projet = await prisma.projets.findUnique({
      where: { id_projet: id_projet },
    });
    if (!projet) {
      throw new GraphQLError("Projet non trouvé");
    }
    await prisma.taches.deleteMany({
      where: { id_projet: id_projet },
    });
    await prisma.devis.deleteMany({
      where: { id_projet: id_projet },
    });
    await prisma.factures.deleteMany({
      where: { id_projet: id_projet },
    });
    await prisma.assignations.deleteMany({
      where: { id_projet: id_projet },
    });
    await prisma.projets.deleteMany({
      where: { id_projet },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression de projet");
  }
}

module.exports = { deleteProjet };
