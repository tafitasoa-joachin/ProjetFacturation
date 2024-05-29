const { dashboard } = require("../query/dashboard/dashboard");
const { clientsAndProjectsCount } = require("../query/dashboard/clientsAndProjectsCount");

const resolvers_dashboard = {
    Query: {
        dashboard,
        clientsAndProjectsCount
    },
}

module.exports = resolvers_dashboard;