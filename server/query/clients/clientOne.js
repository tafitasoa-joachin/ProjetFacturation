const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  clientOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.clients.findUnique({
        where: { id_client: id },
        include: { projets: true },
    });
};

module.exports = { clientOne };

