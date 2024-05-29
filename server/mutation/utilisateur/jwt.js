const constantes = require('../../constantes');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 


const SECRET_KEY = process.env.JWT_CODE ;
// Fonction pour former un jeton JWT
function formerToken(utilisateurId) {
  try 
   {
        const payload = { utilisateurId };// utilisateurID ici ne qu'un parametre on peut changer
        const options = { expiresIn: "1d" };
        const token = jwt.sign( payload , SECRET_KEY , options );
    return token;
    }   
  catch (err) 
   {
        // console.error(err); // Affiche l'erreur dans la console d'erreur
        throw new Error(constantes.ERREUR_CREATION_TOKEN);
    }
}

// Fonction pour vérifier un jeton JWT
function verifierToken(token) {
  try
    {
      // const decoded = jwt.verify(token , SECRET_KEY);
      return jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
          return false;
        } else {
          // console.log(decoded);
          return decoded;
        }
      });
      // return decoded;
    } 
  catch (err) 
    {
        // console.error(err); // Affiche l'erreur dans la console d'erreur
        throw new Error(constantes.VERIFICATION_TOKEN);
    }
}

module.exports = { formerToken , verifierToken };
