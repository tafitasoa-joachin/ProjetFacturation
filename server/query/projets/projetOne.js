const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  projetOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.projets.findUnique({
        where: { id_projet: id },
        include: {
            taches: true,
            devis: true,
            factures: true,
            assignations: true
        }
    });
};

module.exports = { projetOne };
