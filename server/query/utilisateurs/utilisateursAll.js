const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const utilisateursAll = async (parent,args) => {
    return await prisma.utilisateurs.findMany({
      include: { projets: true },
    });
  }

module.exports = { utilisateursAll };