const { addMembre } = require("../mutation/membres/addMembre");
const { updateMembre } = require("../mutation/membres/updateMembre");
const { deleteMembre } = require("../mutation/membres/deleteMembre");
const { membreOne } = require("../query/membres/membreOne");
const { membresAll } = require("../query/membres/membresAll");

const resolvers_membre = {
    Query: {
        membreOne,
        membresAll
    },
    Mutation: {
        addMembre,
        updateMembre,
        deleteMembre
    }
}

module.exports = resolvers_membre;