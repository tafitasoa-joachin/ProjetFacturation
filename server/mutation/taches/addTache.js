
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addTache = async (parent, args, context) => {
  try {
    const { 
      id_projet,
      nom,
      description,
      dateDebut,
      dateEcheance,
      priorite,
      statut,
    } = args;

    console.log(
      id_projet,
      nom,
      description,
      dateDebut,
      dateEcheance,
      priorite,
      statut,
    );

    const nouvelTache = await prisma.taches.create({
      data: {
        id_projet,
        nom: nom ? nom : "Inconu",
        description: description ? description : "",
        dateDebut: dateDebut ? dateDebut : "",
        dateEcheance: dateEcheance ? dateEcheance : "",
        priorite: priorite ? priorite : "1",
        statut: statut ? statut : "En cours",
      },
    });
    console.log(nouvelTache);
    return nouvelTache;  

  } catch (error) {
    // Gestion des erreurs
    console.log(error);
    return  "Erreur lors du création du tache";
  }
};

module.exports = { addTache };
