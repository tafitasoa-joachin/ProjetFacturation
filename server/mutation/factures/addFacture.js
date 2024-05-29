
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addFacture = async (parent, args) => {
  try {
    
    const { id_projet, id_devis, dateCreation, montantTotal, statut, autres } = args;

    const nouvelFacture = await prisma.factures.create({
      data: {
        id_projet, id_devis, dateCreation, montantTotal, statut, autres
      },
    });

    return nouvelFacture;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création de facture";
  }
};

module.exports = { addFacture };
