# Running the Server
npm start

# Running Prisma inside Docker
To run Prisma inside a Docker container :
docker exec -it prisma-server sh

# Once inside the container, you can use the following commands to migrate and deploy Prisma:

app# npx prisma migrate dev --name init
app# npx prisma migrate deploy

# After executing these commands, Prisma will be ready to connect your code with the database.
Note: Please make sure you have Docker installed and running on your system before running Prisma inside a Docker container.