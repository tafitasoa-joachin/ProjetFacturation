-- CreateTable
CREATE TABLE "Utilisateurs" (
    "id_utilisateur" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,

    CONSTRAINT "Utilisateurs_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id_client" SERIAL NOT NULL,
    "nom" TEXT,
    "adresse" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "autres" TEXT,
    "dateAjout" TIMESTAMP(3),

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "Projets" (
    "id_projet" SERIAL NOT NULL,
    "nom" TEXT,
    "description" TEXT,
    "dateDebut" TEXT,
    "dateEcheance" TEXT,
    "statut" TEXT,
    "id_createur" TEXT NOT NULL,
    "id_client" INTEGER NOT NULL,
    "autres" TEXT,

    CONSTRAINT "Projets_pkey" PRIMARY KEY ("id_projet")
);

-- CreateTable
CREATE TABLE "Taches" (
    "id_tache" SERIAL NOT NULL,
    "id_projet" INTEGER NOT NULL,
    "nom" TEXT,
    "description" TEXT,
    "dateDebut" TEXT,
    "dateEcheance" TEXT,
    "priorite" TEXT,
    "statut" TEXT,
    "autres" TEXT,

    CONSTRAINT "Taches_pkey" PRIMARY KEY ("id_tache")
);

-- CreateTable
CREATE TABLE "Membres" (
    "id_membre" SERIAL NOT NULL,
    "nom" TEXT,
    "email" TEXT,
    "autres" TEXT,

    CONSTRAINT "Membres_pkey" PRIMARY KEY ("id_membre")
);

-- CreateTable
CREATE TABLE "Assignations" (
    "id_assignation" SERIAL NOT NULL,
    "id_projet" INTEGER NOT NULL,
    "id_membre" INTEGER NOT NULL,
    "role" TEXT,
    "autres" TEXT,

    CONSTRAINT "Assignations_pkey" PRIMARY KEY ("id_assignation")
);

-- CreateTable
CREATE TABLE "Devis" (
    "id_devis" SERIAL NOT NULL,
    "id_projet" INTEGER NOT NULL,
    "montantTotal" DOUBLE PRECISION,
    "statut" TEXT,

    CONSTRAINT "Devis_pkey" PRIMARY KEY ("id_devis")
);

-- CreateTable
CREATE TABLE "ElementDevis" (
    "id_elementDevis" SERIAL NOT NULL,
    "id_devis" INTEGER NOT NULL,
    "description" TEXT,
    "prixUnitaire" DOUBLE PRECISION,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "ElementDevis_pkey" PRIMARY KEY ("id_elementDevis")
);

-- CreateTable
CREATE TABLE "Factures" (
    "id_facture" SERIAL NOT NULL,
    "id_projet" INTEGER NOT NULL,
    "id_devis" INTEGER NOT NULL,
    "dateCreation" TEXT,
    "montantTotal" DOUBLE PRECISION,
    "statut" TEXT,
    "autres" TEXT,

    CONSTRAINT "Factures_pkey" PRIMARY KEY ("id_facture")
);

-- CreateTable
CREATE TABLE "Paiements" (
    "id_paiement" SERIAL NOT NULL,
    "id_facture" INTEGER NOT NULL,
    "montant" DOUBLE PRECISION,
    "datePaiement" TEXT,
    "conditionPaiement" TEXT,
    "autres" TEXT,

    CONSTRAINT "Paiements_pkey" PRIMARY KEY ("id_paiement")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateurs_email_key" ON "Utilisateurs"("email");

-- AddForeignKey
ALTER TABLE "Projets" ADD CONSTRAINT "Projets_id_createur_fkey" FOREIGN KEY ("id_createur") REFERENCES "Utilisateurs"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projets" ADD CONSTRAINT "Projets_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Clients"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taches" ADD CONSTRAINT "Taches_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projets"("id_projet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignations" ADD CONSTRAINT "Assignations_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projets"("id_projet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignations" ADD CONSTRAINT "Assignations_id_membre_fkey" FOREIGN KEY ("id_membre") REFERENCES "Membres"("id_membre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projets"("id_projet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementDevis" ADD CONSTRAINT "ElementDevis_id_devis_fkey" FOREIGN KEY ("id_devis") REFERENCES "Devis"("id_devis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factures" ADD CONSTRAINT "Factures_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projets"("id_projet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factures" ADD CONSTRAINT "Factures_id_devis_fkey" FOREIGN KEY ("id_devis") REFERENCES "Devis"("id_devis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiements" ADD CONSTRAINT "Paiements_id_facture_fkey" FOREIGN KEY ("id_facture") REFERENCES "Factures"("id_facture") ON DELETE RESTRICT ON UPDATE CASCADE;
