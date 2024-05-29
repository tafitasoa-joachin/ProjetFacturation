const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const  membreOne = async (parent, args, context) => {
    const { id } = args;
    return await prisma.membres.findUnique({
        where: { id_membre: id },
        include: {
            assignations: true,
        }
    });
};

module.exports = { membreOne };

