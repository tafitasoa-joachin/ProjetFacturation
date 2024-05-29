const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  devisOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.devis.findUnique({
        where: { id_devis: id },
        include: {
            elementsDevis: true,
            factures: true
        }
    });
};

module.exports = { devisOne };

