const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  // aficher un seul utilisateur (avec prisma on utilise findUnique) article true
const  assignationOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.assignations.findUnique({
        where: { id_assignation: id },
    });
};

module.exports = { assignationOne };

