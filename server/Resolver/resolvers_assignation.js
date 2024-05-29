const { addAssignation } = require("../mutation/assignations/addAssignation");
const { updateAssignation } = require("../mutation/assignations/updateAssignation");
const { deleteAssignation } = require("../mutation/assignations/deleteAssignation");
const { assignationOne } = require("../query/assignations/assignationOne");
const { assignationsAll } = require("../query/assignations/assignationsAll");

const resolvers_Assignation = {
    Query: {
        assignationOne,
        assignationsAll
    },
    Mutation: {
        addAssignation,
        updateAssignation,
        deleteAssignation
    }
}

module.exports = resolvers_Assignation;