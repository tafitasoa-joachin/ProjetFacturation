const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const membresAll = async (parent,args) => {
    try{
        const { page, pageSize } = args;
        const count = await prisma.membres.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const membresAll =  await prisma.membres.findMany({
            skip: skip,
            take: pageSize,
            include: { assignations: true }
        })

        return {
            membresAll,
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

module.exports = { membresAll };