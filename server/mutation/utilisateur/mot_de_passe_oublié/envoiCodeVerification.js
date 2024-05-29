const { PrismaClient } = require('@prisma/client');
const constantes = require('../../../constantes');

const { ApolloError } = require('apollo-server-express');

const nodemailer = require('nodemailer');
const { Client } = require("../redis");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: constantes.MAIL_HOST,
  port: constantes.MAIL_PORT,
  secure: constantes.MAIL_SECURE,
  requireTLS: constantes.MAIL_REQUIRE_TLS,
  auth: {
    user: constantes.MAIL_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

// Générer un code de vérification aléatoire à 4 chiffres
function genererCodeVerification() {
  let code;
  do {
    code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  } while (code.length !== 4);
  
  // console.log(constantes.LOG_CODE_VERIFICATION_GENERE, code);
  return code;
}

// Envoyer le code de vérification par e-mail
async function envoyerCodeVerification(parent, args) {
  try {
    
    const { email } = args;

    const utilisateur = await prisma.utilisateur.findUnique({
      where: {
        email: email
      }
    });
    
    if (!utilisateur) {
      return new Error(constantes.VERIFIER_MAIL);
    }

    if (utilisateur) {
      const codeVerification = genererCodeVerification();
      // console.log (constantes.LOG_CODE_VERIFICATION_UTILISE, codeVerification);

      const mailOptions = {
        from: constantes.MAIL_FROM,
        to: email,
        subject: constantes.MAIL_SUBJECT,
        text: constantes.MAIL_TEXT + codeVerification
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // console.error(error);
        } else {
          // console.log (constantes.LOG_MAIL_ENVOYE, info.response, constantes.LOG_CODE_VERIFICATION_UTILISATEUR_DOIT_ENTRER, codeVerification);
          
          // Stocker le code de vérification dans Redis avec une clé unique
          Client.set(utilisateur.email, codeVerification, constantes.redisExpiration, (error, reply) => {
            if (error) {
              // console.error(constantes.LOG_ERREUR_SAUVEGARDE_CODE_VERIFICATION_REDIS, error);
            } else {
              // console.log (constantes.LOG_CODE_VERIFICATION_STOCKER_REDIS);
            }
          });
        }
      });

      // console.log (constantes.LOG_CODE_VERIFICATION_ENVOYE_UTILISATEUR);
      return {
        utilisateur: utilisateur,
        codeVerification: codeVerification
      };
    } else {
      // console.log (constantes.LOG_EMAIL_NON_TROUVE_DANS_BD);
    }
  } catch (error) {
    // console.error(constantes.LOG_ERREUR_RECHERCHE_UTILISATEUR, error);
  }
}

module.exports = { envoyerCodeVerification };
