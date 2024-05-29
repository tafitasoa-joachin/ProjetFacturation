const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clientsAll = async (parent,args) => {
    try {
        const { page, pageSize } = args;

        const count = await prisma.clients.count();

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const clientsAll =  await prisma.clients.findMany({
            skip: skip,
            take: pageSize,
            include: { projets: true }
        });

        return{
            clientsAll,
            pageInfos: {
                pageActuelle: page ,               
                totalPages: totalPages,
                nombreCountTotal:  count,
                tailleDePage: pageSize
            }
        }

    }catch(error){
        console.log(error)
    }

}

module.exports = { clientsAll };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       