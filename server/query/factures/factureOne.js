const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  factureOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.factures.findUnique({
        where: { id_facture: id },
        include: {
            paiements: true,
        }
    });
};

module.exports = { factureOne };

