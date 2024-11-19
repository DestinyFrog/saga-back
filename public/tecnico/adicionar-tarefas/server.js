(async () => {

	const LINK = "/api/v1"

	const el_maquina_select = document.getElementById("maquina-select")
	const el_equipe_select = document.getElementById("equipe-select")
	const el_surname = document.getElementById("surname")
	const el_data_inicio = document.getElementById("data-inicio")
	const el_data_vencimento = document.getElementById("data-vencimento")
	const el_tipo = document.getElementById("tipo")
	const el_processo = document.getElementById("tipo")
	const el_descricao = document.getElementById("descricao")
	const el_criticidade = document.getElementById("criticidade")
	const btn_salva = document.getElementById("btn-salva")

	const now = new Date()
	el_data_inicio.value = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
	el_data_vencimento.value = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`

	try {

		const maquina_lista = document.getElementById("maquina-lista")
		
		let resp = await fetch(LINK+"/maquina")
		let data = await resp.json()

		maquina_lista.innerHTML = ""

		data.forEach(({id, nome, descricao, codigo, Tarefa}) => {
			maquina_lista.innerHTML += `
				<div class="maquina">
                    <h4 id="maquina">${codigo}. ${nome}</h4>
                    <h4 id="maquina">${descricao}</h4>
                    <h4 id="estado">${Tarefa.length<1
						? "OK"
						: Tarefa[0].estado
					}</h4>
                </div>
			`

			el_maquina_select.innerHTML += `
				<option value="${id}">${nome}</option>
			`
		})

		resp = await fetch(LINK+"/equipe")
		data = await resp.json()

		data.forEach(({id, nome}) => {
			el_equipe_select.innerHTML += `
				<option value="${id}">${nome}</option>
			`
		})

	}
	catch (err) {
		console.error(err)
	}

	btn_salva.addEventListener('click', async (ev) => {
		const body = {
			id_maquina: el_maquina_select.value,
			id_equipe: el_equipe_select.value,
			titulo: el_surname.value,
			data_inicio: el_data_inicio.value,
			data_final: el_data_vencimento.value,
			tipo: el_tipo.value || "PREDITIVA",
			processo: el_processo.value || "PENDENTE",
			criticidade: el_criticidade.value || 0,
			descricao: el_descricao.value
		}

		const res = await fetch(LINK+"/tarefa", {
			body: JSON.stringify(body),
			headers: { Accept: 'application/json', "Content-Type": 'application/json' },
			method: "POST"
		})

		const data = await res.json()
		console.log(data) 
	} )

})
.call(this)