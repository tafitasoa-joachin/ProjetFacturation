const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("../utilisateur/verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient();

const updateClient = async (parent, args, context) => {
  try {
    const {
      id_client,
      nom, email, adresse, telephone, autres
    } = args;

    // const utilisateurId = await autorisation(context.token);
    // if (utilisateurId === 0) {
    //   return new GraphQLError(constantes.CONNECTION_REFUSE);
    // }

    let dataToUpdate = {
      nom, email, adresse, telephone, autres
    };

    // Vérification si l'email est déjà utilisé
    const clientExist = await prisma.clients.findFirst({
      where: {
        email: email,
        NOT: {
          id_client: id_client
        }
      }
    });

    if (clientExist) {
      return new Error("Client n'existe pas dans la base de donnée");
    }

    dataToUpdate.email = email;


    let updateClient;

    updateClient = await prisma.clients.update({
      where: {
        id_client: id_client
      },
      data: dataToUpdate
    });
    
    return updateClient;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de modification de client");
  }
};

module.exports = { updateClient };
