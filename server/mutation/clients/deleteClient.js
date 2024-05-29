const { PrismaClient } = require("@prisma/client");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const prisma = new PrismaClient();

async function deleteClient(parent, args) {
  try {
    const { id_client } = args;

    const client = await prisma.clients.findUnique({
      where: { id_client },
    });
    if (!client) {
      throw new GraphQLError("Client non trouvé");
    }

    await prisma.projets.deleteMany({
      where: { id_client },
    });

    await prisma.clients.deleteMany({
      where: { id_client },
    });

    return true;

  } catch (error) {
    console.error(error);
    throw new GraphQLError("Erreur lors du suppression du client");
  }
}

module.exports = { deleteClient };
