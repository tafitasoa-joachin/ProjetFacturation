const { PrismaClient } = require("@prisma/client");
const { autorisation } = require("./verifierAuth");
const constantes = require("../../constantes");
const { GraphQLError } = require("graphql");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const updateUtilisateur = async (parent, args, context) => {
  try {
    const {
      id,
      nom,
      prenom,
      email,
      motDePasse,
      telephone,
      facebook,
      whatsapp,
      photo
    } = args;

    // Vérifier si l'utilisateur est authentifié
    const utilisateurId = await autorisation(context.token);
    if (utilisateurId === 0) {
      return new GraphQLError(constantes.CONNECTION_REFUSE);
    }

    let dataToUpdate = {
      nom,
      prenom,
      telephone,
      facebook,
      whatsapp
    };

    if (email !== undefined) {
      // Vérification de l'email avec la regex
      if (!constantes.REGEX_VERIFICATION_EMAIL.test(email)) {
        return new Error(constantes.EMAIL_INVALIDE);
      }

      // Vérification si l'email est déjà utilisé
      const utilisateurExist = await prisma.utilisateurs.findFirst({
        where: {
          email: email,
          NOT: {
            id_utilisateur: id
          }
        }
      });

      if (utilisateurExist) {
        return new Error(`${constantes.EMAIL_DEJA_UTILISE} ${email}`);
      }

      dataToUpdate.email = email;
    }

    if (motDePasse !== undefined) {
      // Vérification du mot de passe de l'utilisateur avec la regex
      if (!constantes.REGEX_VERIFICATION_MDP.test(motDePasse)) {
        return new Error(constantes.MOT_DE_PASSE_INVALIDE);
      }

      // Hashage du mot de passe
      const hashMotDePasse = await bcrypt.hash(motDePasse, 10);
      dataToUpdate.motDePasse = hashMotDePasse;
    }

    let updateUtilisateur;

    if (photo === undefined) {
      updateUtilisateur = await prisma.utilisateurs.update({
        where: {
          id_utilisateur: id
        },
        data: dataToUpdate
      });
    } else {
      // Stocker directement l'URL sécurisée de l'image envoyée par le front-end
      const urlImage = photo;

      updateUtilisateur = await prisma.utilisateurs.update({
        where: {
          id_utilisateur: id
        },
        data: {
          photo: urlImage,
          ...dataToUpdate
        }
      });
    }

    // Retourner la réponse au front-end avec les données de l'utilisateur mis à jour
    return updateUtilisateur;
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error(constantes.ERREUR_MISE_A_JOUR_UTILISATEUR);
  }
};

module.exports = { updateUtilisateur };
