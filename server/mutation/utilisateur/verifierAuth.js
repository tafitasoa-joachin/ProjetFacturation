const { verifierToken } = require("../utilisateur/jwt.js");
const { Client } = require("./redis");

// Créer un client Redis pour communiquer avec Redis
async function autorisation(context) {
  const token = context; //token.token
  const decoded = verifierToken(token);
  // console.log("decoded " ,decoded); // debug

  let utilisateurId;
    if (decoded && decoded.utilisateurId) {
      utilisateurId = decoded.utilisateurId;
    } else {
        return 0;
        // throw new GraphQLError("Erreur d'authentification : jeton non valide");
    }   
    // console.log("maka ilay utilisateurID izay hita tao anaty decodage...");
    // console.log(utilisateurId);


  const isTokenInRedis = await Client.get(utilisateurId);

  // console.log(isTokenInRedis); // affichage token dans le redis ca c'est au cas de de debugage
  if (isTokenInRedis !== token) {
    return 0;
  } 
  // else {
    // console.log("Token dans le redis : ",isTokenInRedis); // C'est le token    // console.log("bien le token dans le header est correct il doit commencer...");
  // }

  return utilisateurId ;

}

module.exports = { autorisation };
