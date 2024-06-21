
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addDevis = async (parent, args) => {
  try {
    
    const {  id_projet, montantTotal, statut, nom_projet } = args;

    const nouvelDevis = await prisma.devis.create({
      data: {
        id_projet, montantTotal, statut, nom_projet
      },
    });

    return nouvelDevis;
    
  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création du devis";
  }
};

module.exports = { addDevis };
