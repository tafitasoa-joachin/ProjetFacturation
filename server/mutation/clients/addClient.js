const { PrismaClient } = require('@prisma/client');
const shortid = require('shortid');
const constantes = require('../../constantes');

const prisma = new PrismaClient();

const addClient = async (parent, args, context) => {
  try {
    
    const { nom, email, adresse,telephone, autres } = args;
    console.log(nom, email, adresse, telephone, autres);
    const nouvelClient = await prisma.clients.create({
      data: {
        nom, email, adresse, telephone, autres, dateAjout: new Date()
      },
    });
    console.log(nouvelClient);

    return nouvelClient;

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return "Erreur lors du création du client";
  }
};

module.exports = { addClient };
