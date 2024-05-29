const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addAssignation = async (parent, args, context) => {
  try {
    const { id_projet, id_membre,role, autres } = args;
    
    const nouvelAssignation = await prisma.assignations.create({
      data: {
        id_projet, id_membre,role, autres
      },
    });

    return nouvelAssignation;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création d'assignation";
  }
};

module.exports = { addAssignation };
