const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const devisAll = async (parent,args) => {
    try {
        const { page, pageSize } = args;
        const count = await prisma.devis.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const devisAll =  await prisma.devis.findMany({
            skip: skip,
            take: pageSize,
            include: { elementsDevis: true, factures: true  }
        })

        return {
            devisAll,
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

module.exports = {devisAll};