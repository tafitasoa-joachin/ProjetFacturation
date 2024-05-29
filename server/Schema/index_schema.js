const fs = require('fs');


const allModels = fs.readFileSync("./Schema/AllModels.graphql",{encoding :'utf-8'});
const utilisateur = fs.readFileSync('./Schema/Utilisateur.graphql',{encoding:'utf-8'});

// par ailleurs ça aura des erreurs sans ./Schema
const typeDefs =   utilisateur + allModels;

// console.log(typeDefs); // commentaire debug(typeDefs);

module.exports = typeDefs
