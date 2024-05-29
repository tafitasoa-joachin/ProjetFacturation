const { addElementDevis } = require("../mutation/elementDevis/addElementDevis");
const { updateElementDevis } = require("../mutation/elementDevis/updateElementDevis");
const { deleteElementDevis } = require("../mutation/elementDevis/deleteElementDevis");
const { elementDevisOne } = require("../query/elementsDevis/elementDevisOne");
const { elementDevisAll } = require("../query/elementsDevis/elementDevisAll");

const resolvers_ElementDevis = {
    Query: {
        elementDevisOne,
        elementDevisAll
    },
    Mutation: {
        addElementDevis,
        updateElementDevis,
        deleteElementDevis
    }
}

module.exports = resolvers_ElementDevis;