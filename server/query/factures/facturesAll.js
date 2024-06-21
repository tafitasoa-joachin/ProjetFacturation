const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const facturesAll = async (parent,args) => {
    try {
        const { page, pageSize } = args;
        const count = await prisma.factures.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        // const facturesAll =  await prisma.factures.findMany({
        //     skip: skip,
        //     take: pageSize,
        //     include: { paiements: true }
        // })
        const facturesAll = await prisma.factures.findMany({
            skip: skip,
            take: pageSize,
            include: {
              projet: {
                include: {
                  createur: true,
                  client: true,
                },
              },
              devis: true,
              paiements: true,
            },
        });

        return {
            facturesAll, 
            pageInfos: {
                pageActuelle: page ,               
                totalPages: totalPages,
                nombreCountTotal:  count,
                tailleDePage: pageSize
            }
        }

    }catch(error){
        throw GraphQLError(error);
    }
}

module.exports = {facturesAll};