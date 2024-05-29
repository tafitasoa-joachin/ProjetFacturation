const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const ApolloServerPluginLandingPageGraphQLPlayground = require('@apollo/server-plugin-landing-page-graphql-playground').ApolloServerPluginLandingPageGraphQLPlayground;
const { io, server, app } = require('./subscription/socket');
// schema
const typeDefs = require('./Schema/index_schema');
// resolvers
const resolvers = require("./Resolver/index_resolvers");
const { autorisation } = require("./mutation/utilisateur/verifierAuth");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ 
  // introspection: true,
  // playground: true,
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    const utilisateurId = await autorisation(token);
    // Ajoutez l'instance de Socket.IO au contexte
    return { token, utilisateurId };
  }
});


// Middleware Socket.IO
io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  // Send existing messages to the new client
  // socket.emit('existingMessages', messages);

  // Handle chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Démarrer Apollo Server avant d'appliquer le middleware
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

// Démarrer le serveur après avoir configuré Socket.IO et Apollo Server
startApolloServer().then(() => {
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});


