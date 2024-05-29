const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const clientsAndProjectsCount = async (parent, args, context) => {
    try {
        const { year } = args;
        const clientCount = await prisma.clients.count({
            where: {
              dateAjout: {
                gte: new Date(`${year}-01-01`),
                lt: new Date(`${year + 1}-01-01`),
              },
            },
        });
        
        const projectCount = await prisma.projets.count({
            where: {
              dateAjout: {
                gte: new Date(`${year}-01-01`),
                lt: new Date(`${year + 1}-01-01`),
              },
            },
        });
        
        return { clientCount, projectCount };
    } catch(error) {
        console.log(error);
        throw new GraphQLError(error.message);
    }
};

module.exports = { clientsAndProjectsCount };
