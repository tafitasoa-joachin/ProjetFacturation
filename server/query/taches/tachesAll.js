const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tachesAll = async (parent,args) => {
  try {
    const { page, pageSize } = args;

    const count = await prisma.taches.count();

    const totalPages = Math.ceil(count / pageSize);
    const skip = page * pageSize;

    const tachesAll =  await prisma.taches.findMany({
      skip: skip,
      take: pageSize,
    })

    // console.log(tachesAll);

    return {
      tachesAll,
      pageInfos: {
        pageActuelle: page ,               
        totalPages: totalPages,
        nombreCountTotal:  count,
        tailleDePage: pageSize
      }
    }
  }catch(error){
    console.log(error)
    throw GraphQLError(error)
  }
}

module.exports = { tachesAll };