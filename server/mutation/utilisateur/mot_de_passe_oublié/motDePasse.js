const { PrismaClient } = require("@prisma/client");
const constantes = require('../../../constantes');
const { Client } = require("../redis");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function forgetpass(parent, args) {
  try {
    // console.log ("Args reçus :", args);// test de debug
    const { email, codeVerification, nouveauMotDePasse } = args; // Destructuring des arguments
    console.log("Code verification", codeVerification)
    console.log("E-mail", email)
    const utilisateur = await prisma.utilisateur.findUnique({
      where: {
        email: email, // Utiliser args.email comme argument pour la recherche unique
      },
    });

    if (utilisateur) {
      // Vérifier si le code de vérification entré par l'utilisateur correspond à celui dans Redis
      const storedCode = await Client.get(email); // Récupérer le code de Redis
      console.log ("storedCode:", storedCode);

      if (codeVerification === storedCode) {
        // Vérification du nouveau mot de passe avec la regex
        if (!constantes.REGEX_VERIFICATION_MDP.test(nouveauMotDePasse)) {
          return new Error(constantes.MOT_DE_PASSE_INVALIDE);
        }
        // Le code de vérification est correct, mettre à jour le mot de passe de l'utilisateur
        const nouveauMotDePasseHash = await bcrypt.hash(nouveauMotDePasse, 10);
        await prisma.utilisateur.update({
          where: {
            email: email
          },
          data: {
            motDePasse: nouveauMotDePasseHash
          }
        });

        console.log (constantes.MSG_MDP_MAJ);
        return {
          message: nouveauMotDePasseHash
        };
      } else {
        console.log (constantes.CODE_VERIF_INCORRECT);
        return new Error(constantes.CODE_VERIF_INCORRECT);
      }
    } else {
      console.log (constantes.LOG_EMAIL_NON_TROUVE_DANS_BD);
      return new Error(constantes.LOG_EMAIL_NON_TROUVE_DANS_BD);
    }
  } catch (error) {
    console.error(constantes.ERREUR_REINITIALISATION_MDP , error);
    return new Error(constantes.ERREUR_REINITIALISATION_MDP);
  }
}

module.exports = { forgetpass };
