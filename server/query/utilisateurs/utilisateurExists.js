const { PrismaClient } = require('@prisma/client');
const constantes = require('../../constantes');

const prisma = new PrismaClient();

const utilisateurExists = async (parent, args) => {
  try {

    const { email } = args;
    console.log(email);
    // Vérification si l'email existe dans la base de données
    const utilisateurExist = await prisma.utilisateurs.findFirst({
      where: {
        email: email,
      },
    });

    // Création de la réponse
    const result = {
      utilisateurExists: !!utilisateurExist,
    };

    return result;

  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error("erreur verification email");
  }
};

module.exports = { utilisateurExists };
