const { addFacture } = require("../mutation/factures/addFacture");
const { updateFacture } = require("../mutation/factures/updateFacture");
const { deleteFacture } = require("../mutation/factures/deleteFacture");
const { factureOne } = require("../query/factures/factureOne");
const { facturesAll } = require("../query/factures/facturesAll");

const resolvers_Facture = {
    Query: {
        factureOne,
        facturesAll
    },
    Mutation: {
        addFacture,
        updateFacture,
        deleteFacture
    }
}

module.exports = resolvers_Facture;