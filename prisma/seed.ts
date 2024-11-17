import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import { config } from 'dotenv'

(async () => {
	config()

	const libsql = createClient({
		url: `${process.env.TURSO_DATABASE_URL}`,
		authToken: `${process.env.TURSO_AUTH_TOKEN}`,
	})
	
	const adapter = new PrismaLibSQL(libsql)
	const client = new PrismaClient({ adapter })

	const usuario_peao = await client.usuario.create({
		data:
			{
				nome: "peao",
				login: "peao",
				senha: "pascal",
				acesso: "PEAO",
				cpf: "00000000000",
				email: "peao@email.com",
				telefone: "0000000000000",
			}
	})

	const usuario_peao_eletrica = await client.usuario.create({
		data:
			{
				nome: "peao de elétrica",
				login: "peaoelétrica",
				senha: "pascal",
				acesso: "PEAO",
				cpf: "20000000000",
				email: "peaoelétrica@email.com",
				telefone: "0000200000000",
			}
	})

	const usuario_peao_mecanica = await client.usuario.create({
		data:
			{
				nome: "peao de mecânica",
				login: "peaomecânica",
				senha: "pascal",
				acesso: "PEAO",
				cpf: "10000000000",
				email: "peaomecânica@email.com",
				telefone: "0000100000000",
			}
	})

	const usuario_tecnico = await client.usuario.create({
		data:
			{
				nome: "tecnico",
				login: "tecnico",
				senha: "pascal",
				acesso: "TECNICO",
				cpf: "00000000001",
				email: "tecnico@email.com",
				telefone: "0000000000001",
			}
	})

	const usuario_admin = await client.usuario.create({
		data:
			{
				nome: "admin",
				login: "admin",
				senha: "pascal",
				acesso: "ADMIN",
				cpf: "00000000002",
				email: "admin@email.com",
				telefone: "0000000000002",
			}
	})

	const maquina_retificadora3000 = await client.maquina.create({
		data: {
			nome: "retificadora plana 3000",
			codigo: "1111",
			descricao: "retificadora 3000x mais rapida que todas as outras",
			responsavelId: usuario_tecnico.id
		}
	})

	const mesa_retificadora = await client.submaquina.create({
		data: {
			nome: "mesa",
			descricao: "mesa da retificadora",
			maquinaId: maquina_retificadora3000.id
		}
	})	

	const valvula_retificadora = await client.submaquina.create({
		data: {
			nome: "válvula direcional",
			descricao: "válvula direcional da retificadora",
			maquinaId: maquina_retificadora3000.id
		}
	})	

	const rebolo_retificadora = await client.submaquina.create({
		data: {
			nome: "rebolo",
			descricao: "rebolo da retificadora",
			maquinaId: maquina_retificadora3000.id
		}
	})

	const equipe_eletrica = await client.equipe.create({
		data: {
			nome: "elétrica 1",
			fixa: true,
			usuarios: {
				connect: [
					{	
						id: usuario_peao.id
					},
					{	
						id: usuario_peao_eletrica.id
					}
				]
			}
		}	
	})

	const equipe_mecanica = await client.equipe.create({
		data: {
			nome: "mecanica 1",
			fixa: true,
			usuarios: {
				connect: [
					{	
						id: usuario_peao.id
					},
					{	
						id: usuario_peao_mecanica.id
					}
				]
			}
		}	
	})

	const tarefa_retificadora = await client.tarefa.create({
		data: {
			titulo: "Verificação Retificadora",
			descricao: "verificação semanal da retificadora 3000",
			tipo: "PREDITIVA",
			estado: "PENDENTE",
			maquinaId: maquina_retificadora3000.id,
			criadorId: usuario_tecnico.id,
			equipeId: equipe_mecanica.id,
			SubTarefa: {
				create: [
					{
						submaquinaId: rebolo_retificadora.id,
						titulo: "verificação rebolo",
						descricao: "verificação semanal do rebolo da retificadora",
						criadorId: usuario_tecnico.id
					},
					{
						submaquinaId: valvula_retificadora.id,
						titulo: "verificação válvula",
						descricao: "verificação semanal da válvula da retificadora",
						criadorId: usuario_tecnico.id
					}
				]
			}
		}
	})
	
})
.call(this)