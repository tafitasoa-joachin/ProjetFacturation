const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const dashboard = async (parent, args, context) => {
    try{
        const { year } = args;
        console.log(year)
        const months = [
            'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
          ];
        
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);
    
        const clients = await prisma.clients.findMany({
            where: {
                dateAjout: {
                gte: startDate,
                lte: endDate,
                },
            },
        });

        console.log(clients)
    
        const projects = await prisma.projets.findMany({
        where: {
            dateAjout: {
            gte: startDate,
            lte: endDate,
            },
        },
        });

        console.log(projects)
    
        const clientsByMonth = Array(12).fill(0);
        const projectsByMonth = Array(12).fill(0);
    
        clients.forEach(client => {
        const month = new Date(client.dateAjout).getMonth();
        clientsByMonth[month]++;
        });
    
        projects.forEach(project => {
        const month = new Date(project.dateAjout).getMonth();
        projectsByMonth[month]++;
        });
    
        const clientsStatistics = clientsByMonth.map((count, index) => ({
        month: months[index],
        count,
        }));
    
        const projectsStatistics = projectsByMonth.map((count, index) => ({
        month: months[index],
        count,
        }));
    
        return {
        clients: clientsStatistics,
        projects: projectsStatistics,
        };
    }catch(error){
        console.log(error)
        throw GraphQLError(error);
    }
};

module.exports = { dashboard };
