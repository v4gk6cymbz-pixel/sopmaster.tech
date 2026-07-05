-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pinHash" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'solo',
    "subscriptionActive" BOOLEAN NOT NULL DEFAULT false,
    "credits" INTEGER NOT NULL DEFAULT 100,
    "lifetimeCredits" INTEGER NOT NULL DEFAULT 100,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jurisdiction" TEXT NOT NULL DEFAULT 'UK'
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "TeamMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SOP" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "systems" TEXT NOT NULL DEFAULT '',
    "headcount" TEXT NOT NULL DEFAULT '',
    "jurisdiction" TEXT NOT NULL,
    "complexity" TEXT NOT NULL DEFAULT '1-10',
    "hash" TEXT NOT NULL,
    "verificationHash" TEXT NOT NULL,
    "dateCreated" TEXT NOT NULL,
    "dateCategorized" TEXT NOT NULL,
    "lastModified" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdBy" TEXT NOT NULL DEFAULT '',
    "industry" TEXT,
    "department" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "sopType" TEXT,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "SOP_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "industry" TEXT,
    "jurisdiction" TEXT,
    "companySize" TEXT,
    "departments" TEXT,
    "softwareStack" TEXT,
    "businessGoals" TEXT,
    "operationalChallenges" TEXT,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "CompanyProfile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile_companyId_key" ON "CompanyProfile"("companyId");
