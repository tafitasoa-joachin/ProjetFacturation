
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addPaiement = async (parent, args) => {
  try {
    
    const { id_facture, montant, datePaiement, autres } = args;

    const nouvauxPaiement = await prisma.paiements.create({
      data: {
        id_facture, montant, datePaiement, autres
      },
    });

    return nouvauxPaiement;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création de paiement";
  }
};

module.exports = { addPaiement };
