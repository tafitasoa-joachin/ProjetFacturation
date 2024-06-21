-- AlterTable
ALTER TABLE "Devis" ADD COLUMN     "nom_projet" TEXT;

-- AlterTable
ALTER TABLE "Projets" ADD COLUMN     "nom_client" TEXT;

-- AlterTable
ALTER TABLE "Taches" ADD COLUMN     "nom_projet" TEXT;
