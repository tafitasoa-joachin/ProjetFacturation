const resolvers_utilisateur = require("./resolvers_utilisateur");
const resolvers_membre = require("./resolvers_membre");
const resolvers_assignation = require("./resolvers_assignation");
const resolvers_client = require("./resolvers_client");
const resolvers_devis = require("./resolvers_devis");
const resolvers_elementDevis = require("./resolvers_elementDevis");
const resolvers_facture = require("./resolvers_facture");
const resolvers_paiement = require("./resolvers_paiement");
const resolvers_projet = require("./resolvers_projet");
const resolvers_tache = require("./resolvers_tache");
const resolvers_dashboard = require("./resolvers_dashboard");

const resolvers = {
  Query: {},
  Mutation: {}
};

Object.assign(
  resolvers.Mutation, 
  resolvers_utilisateur.Mutation,
  resolvers_membre.Mutation,
  resolvers_assignation.Mutation,
  resolvers_client.Mutation,
  resolvers_devis.Mutation,
  resolvers_elementDevis.Mutation,
  resolvers_facture.Mutation,
  resolvers_paiement.Mutation,
  resolvers_projet.Mutation,
  resolvers_tache.Mutation
);
Object.assign(
  resolvers.Query, 
  resolvers_utilisateur.Query,
  resolvers_membre.Query,
  resolvers_assignation.Query,
  resolvers_client.Query,
  resolvers_devis.Query,
  resolvers_elementDevis.Query,
  resolvers_facture.Query,
  resolvers_paiement.Query,
  resolvers_projet.Query,
  resolvers_tache.Query,
  resolvers_dashboard.Query
);

module.exports = resolvers;
