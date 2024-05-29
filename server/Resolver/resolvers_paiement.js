const { addPaiement } = require("../mutation/paiements/addPaiement");
const { updatePaiement } = require("../mutation/paiements/updatePaiement");
const { deletePaiement } = require("../mutation/paiements/deletePaiement");
const { paiementOne } = require("../query/paiements/paiementOne");
const { paiementsAll } = require("../query/paiements/paiementsAll");

const resolvers_Paiement = {
    Query: {
        paiementOne,
        paiementsAll
    },
    Mutation: {
        addPaiement,
        updatePaiement,
        deletePaiement
    }
}

module.exports = resolvers_Paiement;