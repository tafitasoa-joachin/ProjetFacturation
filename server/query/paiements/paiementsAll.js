const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const paiementsAll = async (parent,args) => {
    try{
        const { page, pageSize } = args;
        const count = await prisma.paiements.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const paiementsAll =  await prisma.paiements.findMany({
            skip: skip,
            take: pageSize,
        })

        return {
            paiementsAll,
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

module.exports = {paiementsAll};