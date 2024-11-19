-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubTarefa" (
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
INSERT INTO "new_SubTarefa" ("concluido", "createdAt", "criadorId", "descricao", "id", "submaquinaId", "tarefaId", "titulo", "updatedAt") SELECT "concluido", "createdAt", "criadorId", "descricao", "id", "submaquinaId", "tarefaId", "titulo", "updatedAt" FROM "SubTarefa";
DROP TABLE "SubTarefa";
ALTER TABLE "new_SubTarefa" RENAME TO "SubTarefa";
CREATE TABLE "new_Tarefa" (
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
INSERT INTO "new_Tarefa" ("createdAt", "criadorId", "descricao", "equipeId", "estado", "finalizadoEm", "id", "maquinaId", "pid", "tipo", "titulo", "updatedAt") SELECT "createdAt", "criadorId", "descricao", "equipeId", "estado", "finalizadoEm", "id", "maquinaId", "pid", "tipo", "titulo", "updatedAt" FROM "Tarefa";
DROP TABLE "Tarefa";
ALTER TABLE "new_Tarefa" RENAME TO "Tarefa";
CREATE UNIQUE INDEX "Tarefa_pid_key" ON "Tarefa"("pid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
