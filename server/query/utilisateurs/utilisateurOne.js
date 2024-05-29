const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  // aficher un seul utilisateur (avec prisma on utilise findUnique) article true
const  utilisateurOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.utilisateurs.findUnique({
        where: { id_utilisateur: id },
        include: { projets: true },
    });
};

module.exports = { utilisateurOne };

