-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "login" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "acesso" TEXT NOT NULL DEFAULT 'PEAO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maquina" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "responsavelId" INTEGER NOT NULL,

    CONSTRAINT "Maquina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submaquina" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 10,
    "maquinaId" INTEGER NOT NULL,

    CONSTRAINT "Submaquina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fixa" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDENTE',
    "tipo" TEXT NOT NULL DEFAULT 'PREDITIVA',
    "criticidade" INTEGER NOT NULL DEFAULT 0,
    "finalizadoEm" TIMESTAMP(3),
    "criadorId" INTEGER NOT NULL,
    "maquinaId" INTEGER NOT NULL,
    "equipeId" INTEGER,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTarefa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "criticidade" INTEGER NOT NULL DEFAULT 0,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "submaquinaId" INTEGER NOT NULL,
    "criadorId" INTEGER NOT NULL,
    "tarefaId" INTEGER NOT NULL,

    CONSTRAINT "SubTarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespostaSubTarefa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "alerta" BOOLEAN NOT NULL DEFAULT false,
    "subTarefaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "RespostaSubTarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EquipeToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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

-- AddForeignKey
ALTER TABLE "Maquina" ADD CONSTRAINT "Maquina_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submaquina" ADD CONSTRAINT "Submaquina_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "Maquina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "Maquina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarefa" ADD CONSTRAINT "SubTarefa_submaquinaId_fkey" FOREIGN KEY ("submaquinaId") REFERENCES "Submaquina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarefa" ADD CONSTRAINT "SubTarefa_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarefa" ADD CONSTRAINT "SubTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaSubTarefa" ADD CONSTRAINT "RespostaSubTarefa_subTarefaId_fkey" FOREIGN KEY ("subTarefaId") REFERENCES "SubTarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaSubTarefa" ADD CONSTRAINT "RespostaSubTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipeToUsuario" ADD CONSTRAINT "_EquipeToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipeToUsuario" ADD CONSTRAINT "_EquipeToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
