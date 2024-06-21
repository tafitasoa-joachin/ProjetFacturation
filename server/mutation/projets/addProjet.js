const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addProjet = async (parent, args) => {
  try {
    const {
      nom,
      description,
      dateDebut,
      dateEcheance,
      statut,
      id_createur,
      id_client,
      nom_client,
    } = args;

    // Récupérer le dernier client ajouté
    const dernierClient = await prisma.clients.findFirst({
      orderBy: {
        id_client: 'desc',
      },
    });

    if (!dernierClient) {
      throw new Error("Aucun client trouvé");
    }

    const nouvelProjet = await prisma.projets.create({
      data: {
        nom,
        description,
        dateDebut,
        dateEcheance,
        dateAjout: new Date(),
        statut,
        id_createur,
        nom_client,
        id_client: id_client,
      },
    });

    console.log(nouvelProjet);

    return nouvelProjet;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors de la création du projet";
  }
};

module.exports = { addProjet };
