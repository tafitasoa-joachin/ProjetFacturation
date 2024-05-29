const { addClient } = require("../mutation/clients/addClient");
const { updateClient } = require("../mutation/clients/updateClient");
const { deleteClient } = require("../mutation/clients/deleteClient");
const { clientOne } = require("../query/clients/clientOne");
const { clientsAll } = require("../query/clients/clientsAll");

const resolvers_client = {
    Query: {
        clientOne,
        clientsAll
    },
    Mutation: {
        addClient,
        updateClient,
        deleteClient
    }
}

module.exports = resolvers_client;