const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  tacheOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.taches.findUnique({
        where: { id_tache: id },
    });
};

module.exports = { tacheOne };
