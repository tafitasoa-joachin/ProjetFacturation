const { PrismaClient } = require('@prisma/client');
const { GraphQLError } = require('graphql');
const prisma = new PrismaClient();

const projetFilter = async (parent, args) => {
    try {
        const { dateDebut, dateEcheance, page, pageSize } = args;

        // Conversion des dates en objets Date
        const dateDebutObj = new Date(dateDebut);
        const dateEcheanceObj = new Date(dateEcheance);

        // Filtre pour les projets en retard
        const projetsEnRetard = {
            AND: [
                // { dateDebut: { lt: dateDebutObj } },
                { statut: '0' }
            ]
        };

        // Filtre pour les projets en cours
        const projetsEnCours = {
            AND: [
                // { dateEcheance: { lte: dateEcheanceObj } },
                { statut: {lte: '1', lt: '100' } }
            ]
        };

        // Filtre pour les projets terminés
        const projetsTermines = { statut: '100' };

        const filterCondition = {
            OR: [ projetsEnCours, projetsTermines]
        };

        const count = await prisma.projets.count({
            where: filterCondition,
        });

        const totalPages = Math.ceil(count / pageSize);
        const skip = page * pageSize;

        const projetAll = await prisma.projets.findMany({
            skip: skip,
            take: pageSize,
            where: filterCondition,
            include: {
                taches: true,
                devis: true,
                factures: true,
                assignations: true,
            },
        });

        let message="";
        // Déterminer les messages associés à chaque projet
        const messages = projetAll.map(projet => {
            if (projet.dateDebut < dateDebutObj && projet.statut === '0') {
                message =  'Projet en retard';
            } else if (projet.dateEcheance >= dateDebutObj && projet.dateEcheance <= dateEcheanceObj && projet.statut < '100') {
                message =  'Projet en cours';
            } else if (projet.statut === '100') {
                message =  'Projet terminé';
            }
            return message; // Retourne une chaîne vide si aucun message n'est associé au projet
        });

        return {
            projetAll,
            messages: message, // Sérialiser les messages en tant que chaîne JSON
            pageInfos: {
                pageActuelle: page,
                totalPages: totalPages,
                nombreCountTotal: count,
                tailleDePage: pageSize,
            },
        };
    } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
    }
};

module.exports = { projetFilter };
