
const tarefa_descricao = document.getElementById("tarefa-descricao")
tarefa_descricao.style.display = 'none'

const but_fechar = document.getElementById("butFechar")

but_fechar.addEventListener('click', (ev) => {
	tarefa_descricao.style.display = 'none'
})

const vec = []

async function b() {
	const tarefas_lista = document.getElementById("tarefas-lista")

	const resp = await fetch(LINK+"/tarefa/criadas")
	const data = await resp.json()

	console.log(data)

	data.forEach((n) => {
		const {id, titulo, descricao, estado} = n
		vec.push(n)
		tarefas_lista.innerHTML += `
			<div class="maquina" onclick="ch(${vec.length-1})">
				<h4 id="maquina">${titulo}</h4>
				<h4 id="maquina">${descricao}</h4>
				<h4 id="estado">${estado}</h4>
			</div>
		`
	})
}

b()

function ch(n) {
	const {titulo, maquina, createdAt, criador, tipo, estado, criticidade, descricao} = vec[n]

	document.getElementById("nome-maquina").textContent = titulo
	document.getElementById("surname").textContent = maquina.nome
	let d = new Date(createdAt)
	document.getElementById("data-ex").textContent = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
	document.getElementById("data-exi").textContent = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
	document.getElementById("responsavel").textContent = criador.nome
	document.getElementById("tipo-ex").textContent = tipo
	document.getElementById("processo-ex").textContent = estado
	document.getElementById("criticidade-ex").textContent = criticidade
	document.getElementById("descricao-ex").value = descricao

	tarefa_descricao.style.display = 'block'
}