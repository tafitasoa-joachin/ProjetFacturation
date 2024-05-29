const { addDevis } = require("../mutation/devis/addDevis");
const { updateDevis } = require("../mutation/devis/updateDevis");
const { deleteDevis } = require("../mutation/devis/deleteDevis");
const { devisOne } = require("../query/devis/devisOne");
const { devisAll } = require("../query/devis/devisAll");

const resolvers_Devis = {
    Query: {
        devisOne,
        devisAll
    },
    Mutation: {
        addDevis,
        updateDevis,
        deleteDevis
    }
}

module.exports = resolvers_Devis;