const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  elementDevisOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.elementDevis.findUnique({
        where: { id_elementDevis: id },
    });
};

module.exports = { elementDevisOne };

