
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addMembre = async (parent, args) => {
  try {
    
    const { nom, email, autres } = args;

    const nouvauxMembre = await prisma.membres.create({
      data: {
        nom, email, autres
      },
    });

    return nouvauxMembre;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création de membre";
  }
};

module.exports = { addMembre };
