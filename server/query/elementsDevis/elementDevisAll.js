const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const elementDevisAll = async (parent,args) => {
    try{
        const { page, pageSize } = args;
        const count = await prisma.elementDevis.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const elementDevisAll = await prisma.elementDevis.findMany({
            skip: skip,
            take: pageSize,
        });

        return {
            elementDevisAll,
            pageInfos : {
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

module.exports = { elementDevisAll };