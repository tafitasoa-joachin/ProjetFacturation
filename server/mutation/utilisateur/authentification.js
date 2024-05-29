const { PrismaClient } = require("@prisma/client");
const constantes = require("../../constantes.js");
const { GraphQLError } = require("graphql");
const { formerToken } = require("./jwt.js");
const { Client } = require("./redis");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();


// Fonction pour l'authentification d'un utilisateur
async function authentification(parent, args) {
  try {
    
    const { email, motDePasse } = args; // récupérer les valeurs des arguments

    const utilisateur = await prisma.utilisateurs.findUnique({
      where: {
        email: email,
      },
    });

    // Vérifier si l'utilisateur existe dans la base de données
    if (!utilisateur) {
      return new GraphQLError(constantes.UTILISATEUR_NE_PAS_DANS_LA_BD);
    }

    // Vérifier si le mot de passe fourni correspond au mot de passe enregistré pour l'utilisateur
    const motDePasseValide = await bcrypt.compare(
      motDePasse,
      utilisateur.motDePasse
    );
    if (!motDePasseValide) {
      return new GraphQLError(constantes.MOT_DE_PASSE_INCORRECT);
    }

    // Initialiser l'ID de l'utilisateur
    const utilisateurId = utilisateur.id_utilisateur;

    // Créer un jeton JWT
    const token = formerToken(utilisateurId);
    
    // console.log (token); à debugger au cas d'erreur

    // Enregistrer le jeton dans Redis avec une clé est l'ID de l'utilisateur
    // clé = utilisateurID ou bien c'est qui est unique 
    await Client.set(utilisateurId, token);
    // en 1j ou 24H 
    await Client.expire(utilisateurId, 86400);


    return { utilisateur, token };

  } catch (err) {
    console.error(err); // Affiche l'erreur dans la console d'erreur
    return new GraphQLError(constantes.ERREUR_AUTH_UTILISATEUR);
  }
}

// Exporter la fonction d'authentification
module.exports = { authentification };
