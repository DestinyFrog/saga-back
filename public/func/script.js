
(async () => {

	const LINK = "/api/v1"

	const tarefas_lista = document.getElementById("tarefas-lista")

	const resp = await fetch(LINK+"/tarefa")
	const data = await resp.json()

	data.forEach(({id, titulo, descricao}) => {
		tarefas_lista.innerHTML += `
			<div>
				<p>${titulo}</p>
			</div>
		`
	})

})