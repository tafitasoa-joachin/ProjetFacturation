const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  paiementOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.paiements.findUnique({
        where: { id_paiement: id },
    });
};

module.exports = { paiementOne };

