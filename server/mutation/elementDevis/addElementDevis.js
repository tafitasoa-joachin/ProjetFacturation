
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addElementDevis = async (parent, args) => {
  try {
    
    const { id_devis, description, prixUnitaire, quantite } = args;

    const nouvelElementDevis = await prisma.elementDevis.create({
      data: {
        id_devis, description, prixUnitaire, quantite
      },
    });

    return nouvelElementDevis;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création de l'element devis";
  }
};

module.exports = { addElementDevis };
