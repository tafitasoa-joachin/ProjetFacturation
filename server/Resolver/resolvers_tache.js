const { addTache } = require("../mutation/Taches/addTache");
const { updateTache } = require("../mutation/Taches/updateTache");
const { deleteTache } = require("../mutation/Taches/deleteTache");
const { tacheOne } = require("../query/taches/tacheOne");
const { tachesAll } = require("../query/taches/tachesAll");

const resolvers_Tache = {
    Query: {
        tacheOne,
        tachesAll
    },
    Mutation: {
        addTache,
        updateTache,
        deleteTache
    }
}

module.exports = resolvers_Tache;