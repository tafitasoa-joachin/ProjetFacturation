const { addProjet } = require("../mutation/projets/addProjet");
const { updateProjet } = require("../mutation/projets/updateProjet");
const { deleteProjet } = require("../mutation/projets/deleteProjet");
const { projetOne } = require("../query/projets/projetOne");
const { projetAll } = require("../query/projets/projetAll");
const { projetFilter } = require("../query/projets/projetFilter");

const resolvers_Projet = {
    Query: {
        projetOne,
        projetAll,
        projetFilter
    },
    Mutation: {
        addProjet,
        updateProjet,
        deleteProjet
    }
}

module.exports = resolvers_Projet;