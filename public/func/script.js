
const dialog_resposta = document.getElementById("dialog-resposta")
dialog_resposta.style.display = 'none'

const but_fechar_dialog = document.getElementById("resposta-fechar")
but_fechar_dialog.addEventListener('click', (ev) => {
	dialog_resposta.style.display = 'none'
})

const tarefa_descricao = document.getElementById("tarefa-descricao")
tarefa_descricao.style.display = 'none'

const but_fechar = document.getElementById("butFechar")

const resposta_submit = document.getElementById("resposta-submit")
resposta_submit.addEventListener('click', () => {

	const id = document.getElementById('resposta_subtarefa').value
	
	const body = {
		titulo: document.getElementById("resposta-titulo").value,
		descricao: document.getElementById("resposta-descricao").value,
		alerta: document.getElementById("resposta-alerta").checked
	}

	fetch(LINK+"/tarefa/resposta/"+id, {
		body: JSON.stringify(body),
		headers: { Accept: 'application/json', "Content-Type": 'application/json' },
		method: "POST"
	})
	.then(resp => resp.json())
	.then(data => {
		console.log(data)
		dialog_resposta.style.display = 'none'
		location.reload()
	})
	.catch(err => {
		console.error(err)
	})
})

but_fechar.addEventListener('click', (ev) => {
	tarefa_descricao.style.display = 'none'
})

const vec = []

async function b() {
	const tarefas_lista = document.getElementById("tarefas-lista")

	const resp = await fetch(LINK+"/tarefa")
	const data = await resp.json()

	data.forEach((n) => {
		const {id, titulo, descricao, estado} = n
		vec.push(n)
		tarefas_lista.innerHTML += `
			<div class="maquina" onclick="ch(${vec.length-1})">
				<h4 id="maquina">${titulo}</h4>
				<h4 id="maquina">${descricao}</h4>
				<h4 id="estado" style="color:${ estado=="EM ANDAMENTO"?"orange":(estado=="CONCLUÍDO"?"green":"red") };">${estado}</h4>
			</div>
		`
	})
}

b()

function ch(n) {
	tarefa_descricao.style.display = 'block'
	const {titulo, maquina, createdAt, criador, tipo, estado, criticidade, descricao, SubTarefa} = vec[n]

	document.getElementById("nome-maquina").textContent = titulo
	document.getElementById("surname").textContent = maquina.nome
	let d = new Date(createdAt)
	document.getElementById("data-ex").textContent = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
	document.getElementById("data-exi").textContent = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
	document.getElementById("responsavel").textContent = criador.nome
	document.getElementById("tipo-ex").textContent = tipo

	document.getElementById("processo-ex").textContent = estado
	console.log(estado)
	if (estado == "EM ANDAMENTO") {
		document.getElementById("processo-ex").style.color = "orange"
	}
	else if (estado == "CONCLUÍDO") {
		document.getElementById("processo-ex").style.color = "green"
	}

	document.getElementById("criticidade-ex").textContent = criticidade
	document.getElementById("descricao-ex").textContent = descricao

	const subs = SubTarefa.map((sub) => {
		console.log(sub)
		return `
			<li class="subtarefa-con">
				<h3>${sub.titulo}</h3>
				<hr>
				<p>${sub.descricao}</p>
				<p>Concluído: ${sub.concluido?"✅":"❌"}</p>
				<h3>Respostas</h3>
				<button onclick="
					document.getElementById('dialog-resposta').style.display='block';
					document.getElementById('resposta_subtarefa').value = ${sub.id};
				">Responder</button>
			</li>
		`
	})
	document.getElementById("subtarefas").innerHTML = subs.join("")
}