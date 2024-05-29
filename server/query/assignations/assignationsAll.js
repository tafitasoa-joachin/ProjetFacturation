const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const assignationsAll = async (parent,args) => {
    try {
        const { page, pageSize } = args;
        const count = await prisma.assignations.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const assignationsAll =  await prisma.assignations.findMany({
            skip: skip,
            take: pageSize,
        })

        return {
            assignationsAll,
            pageInfos: {
                pageActuelle: page ,               
                totalPages: totalPages,
                nombreCountTotal:  count,
                tailleDePage: pageSize
            }
        }
    }catch(error){
        throw GraphQLError(error)
    }
    
}

module.exports = { assignationsAll };