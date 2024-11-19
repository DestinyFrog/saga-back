-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "login" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "acesso" TEXT NOT NULL DEFAULT 'PEAO'
);

-- CreateTable
CREATE TABLE "Maquina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    CONSTRAINT "Maquina_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Submaquina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 10,
    "maquinaId" INTEGER NOT NULL,
    CONSTRAINT "Submaquina_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "Maquina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fixa" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDENTE',
    "tipo" TEXT NOT NULL DEFAULT 'PREDITIVA',
    "criticidade" INTEGER NOT NULL DEFAULT 0,
    "finalizadoEm" DATETIME,
    "criadorId" INTEGER NOT NULL,
    "maquinaId" INTEGER NOT NULL,
    "equipeId" INTEGER,
    CONSTRAINT "Tarefa_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "Maquina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubTarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "criticidade" INTEGER NOT NULL DEFAULT 0,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "submaquinaId" INTEGER NOT NULL,
    "criadorId" INTEGER NOT NULL,
    "tarefaId" INTEGER NOT NULL,
    CONSTRAINT "SubTarefa_submaquinaId_fkey" FOREIGN KEY ("submaquinaId") REFERENCES "Submaquina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubTarefa_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Tarefa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EquipeToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EquipeToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EquipeToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_pid_key" ON "Usuario"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "Maquina_pid_key" ON "Maquina"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_pid_key" ON "Tarefa"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipeToUsuario_AB_unique" ON "_EquipeToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipeToUsuario_B_index" ON "_EquipeToUsuario"("B");
