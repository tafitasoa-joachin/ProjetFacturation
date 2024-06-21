const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteClient(parent, args) {
  try {
    const { id_client } = args;

    // Vérifiez d'abord si le client existe
    const client = await prisma.clients.findUnique({
      where: { id_client },
    });

    if (!client) {
      throw new GraphQLError("Client non trouvé");
    }

    // Supprimez les relations dépendantes des projets (tâches, devis, factures, paiements, assignations)
    const projets = await prisma.projets.findMany({
      where: { id_client },
    });

    for (const projet of projets) {
      await prisma.taches.deleteMany({
        where: { id_projet: projet.id_projet },
      });

      await prisma.factures.deleteMany({
        where: { id_projet: projet.id_projet },
      });

      await prisma.devis.deleteMany({
        where: { id_projet: projet.id_projet },
      });

      await prisma.assignations.deleteMany({
        where: { id_projet: projet.id_projet },
      });
    }

    // Supprimez les projets
    await prisma.projets.deleteMany({
      where: { id_client },
    });

    // Enfin, supprimez le client
    await prisma.clients.delete({
      where: { id_client },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors de la suppression du client");
  }
}

module.exports = { deleteClient };
