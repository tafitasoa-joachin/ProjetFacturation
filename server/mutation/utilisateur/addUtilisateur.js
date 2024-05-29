const { PrismaClient } = require('@prisma/client');
const shortid = require('shortid');
const bcrypt = require('bcryptjs');
const constantes = require('../../constantes');

const prisma = new PrismaClient();

const addUtilisateur = async (parent, args) => {
  try {
    
    const { nom, prenom, email, motDePasse } = args;

    const id_utilisateur = shortid.generate();

    // Vérification de l'email avec la regex
    if (!constantes.REGEX_VERIFICATION_EMAIL.test(email)) {
      return new Error(constantes.EMAIL_INVALIDE);
    }

    // Vérification du mot de passe de l'utilisateur avec la regex
    if (!constantes.REGEX_VERIFICATION_MDP.test(motDePasse)) {
      return new Error(constantes.MOT_DE_PASSE_INVALIDE);
    }

    // Vérification si l'email est déjà utilisé
    const utilisateurExist = await prisma.utilisateurs.findFirst({
      where: {
        email: email,
      },
    });

    if (utilisateurExist) {
      return new Error(`${constantes.EMAIL_DEJA_UTILISE} ${email}`);
    }

    // Hashage du mot de passe
    const hashMotDePasse = await bcrypt.hash(motDePasse, 10);

    // Création de l'utilisateur dans la base de données
    const nouvelUtilisateur = await prisma.utilisateurs.create({
      data: {
        id_utilisateur,
        nom,
        prenom,
        email,
        motDePasse: hashMotDePasse
      },
    });

    // Retourner la réponse au front-end avec les données de l'utilisateur créé
    return nouvelUtilisateur;

  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    throw new Error(constantes.ERREUR_CREATION_UTILISATEUR);
  }
};

module.exports = { addUtilisateur };
