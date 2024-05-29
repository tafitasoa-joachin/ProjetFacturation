const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const projetAll = async (parent,args) => {
    try{
        const { page, pageSize} = args;
        const count = await prisma.projets.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const projetAll =  await prisma.projets.findMany({
            skip: skip,
            take: pageSize,
            include: { 
                taches: true,
                devis: true,
                factures: true,
                assignations: true
            }
        });

        return {
            projetAll,
            pageInfos: {
                pageActuelle: page,
                totalPages: totalPages,
                nombreCountTotal: count,
                tailleDePage: pageSize,
            },
        }
    }catch(error){
        console.log(error)
        throw GraphQLError(error)
    }
  }

module.exports = {projetAll};