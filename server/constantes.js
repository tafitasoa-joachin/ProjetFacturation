module.exports = {
  EMAIL_INVALIDE: "L'email est invalide.",

  MOT_DE_PASSE_INVALIDE:
    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",

  EMAIL_DEJA_UTILISE: "L'email est déjà utilisé.",

  ERREUR_CREATION_UTILISATEUR: "Erreur lors de la création de l'utilisateur",

  REGEX_VERIFICATION_EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  REGEX_VERIFICATION_MDP:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{8,}$/,

  MOT_DE_PASSE_INCORRECT: "Mot de passe incorrect",

  UTILISATEUR_NE_PAS_DANS_LA_BD:
    "L'utilisateur n'existe pas dans la base de données",

  ERREUR_AUTH_UTILISATEUR:
    "Une erreur s'est produite lors de l'authentification.",

  ERREUR_CREATION_TOKEN:
    "Une erreur s'est produite lors de la formation du jeton JWT.",

  // VERIFICATION_TOKEN: "Une erreur s'est produite lors de la vérification du jeton JWT .",

  VERIFICATION_TOKEN: "Vous devez connecter pour acceder a cette lien ",

  //  ## mot de passe oublié information ##

  // Informations pour l'envoi de e-mail

  // Constantes pour la configuration du serveur SMTP

  MAIL_HOST: "smtp.gmail.com",

  MAIL_PORT: 587,

  MAIL_SECURE: false,

  MAIL_REQUIRE_TLS: true,

  MAIL_USER: "tojosoavinamaster@gmail.com",

  MAIL_FROM: "serviceclientautopbusiness@gmail.com",

  MAIL_SUBJECT: "Code de vérification",

  MAIL_TEXT: "Votre code de vérification est : ",

  // Constantes pour la génération de code de vérification aléatoire
  MIN_CODE_VERIFICATION: 1000,

  MAX_CODE_VERIFICATION: 9999,

  // Messages de journalisation
  LOG_CODE_VERIFICATION_GENERE: "Code de vérification généré : ",

  LOG_CODE_VERIFICATION_UTILISE: "Code de vérification utilisé : ",

  LOG_MAIL_ENVOYE: "Le message a été envoyé : ",

  LOG_CODE_VERIFICATION_UTILISATEUR_DOIT_ENTRER:
    "Le code de vérification que l'utilisateur doit entrer est : ",

  LOG_CODE_VERIFICATION_ENVOYE_UTILISATEUR:
    "Le code de vérification a été envoyé à l'utilisateur.",

  LOG_EMAIL_NON_TROUVE_DANS_BD:
    "L'adresse E-mail n'a pas été trouvée dans la base de données.",

  LOG_ERREUR_RECHERCHE_UTILISATEUR:
    "Erreur lors de la recherche de l'utilisateur : ",

  LOG_ERREUR_SAUVEGARDE_CODE_VERIFICATION_REDIS:
    "Erreur lors de la sauvegarde du code de vérification dans Redis : ",

  LOG_CODE_VERIFICATION_STOCKER_REDIS:
    "Le code de vérification a été stocké dans Redis.",

  ERREUR_REINIT_MDP: "Erreur lors de la réinitialisation du mot de passe :",

  CODE_VERIF_INCORRECT:
    "Le code de vérification entré ne correspond pas à celui stocké dans Redis.",

  MSG_MDP_MAJ: "Mot de passe mis à jour avec succès.",

  ERREUR_REINITIALISATION_MDP:
    "Erreur lors de la réinitialisation du mot de passe : ",

  ERREUR_AUTHORIZATION_HEADER: "Erreur authorisation HEADER ",

  ERREUR_AUTH_TOKEN_INVALIDE: "Erreur authentification Token",

  ERREUR_AUTH_NON_CONNECTE: " utilisateur ne pas connecter ",

  CONNECTION_REFUSE: "Connexion refusée",

  ERREUR_AJOUT_ARTICLE: "erreur lors d'ajout articles",

  ERREUR_RECUPERATION_ARTICLES: "Erreur récuperation articles",

  UTILISATEUR_DECONNECTER: "Utilisateur déconnecté ",

  ERREUR_LORS_DE_LA_DECONNECTION:
    "Une erreur est survenue lors de la déconnexion.",

  ARTICLE_NON_TROUVE: "Article non trouvé",


  ERREUR_AFFICHAGE:
    "Erreur lors de l'affichage du nombre d'articles spécifique",

  ERREUR_COMPTAGE:
    "Erreur lors du comptage des articles vendus par type de produit",

  ERREUR_MODIFICATION_ARTICLE: "Erreur modification article",

  ERREUR_RECUPERATION_ARTICLE: "Erreur lors récuperation article",

  ERREUR_MISE_A_JOUR_UTILISATEUR:
    "Erreur lors de la mise à jour de l'utilisateur",

  ERREUR_SUPPRESSION_ARTICLE:"Erreur de suppression article",

  ARTICLE_SUPPRIME: "Article a été supprimer avec success",

};
