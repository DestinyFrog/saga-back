
const vec = []

const usuario_select = document.getElementById("usuario-select")
usuario_select.addEventListener('change', () => {
	const id = usuario_select.value
	const obj = vec[id]

	document.getElementById("login").textContent = obj.login
	document.getElementById("surname").textContent = obj.nome
	document.getElementById("email").textContent = obj.email
	document.getElementById("telefone").textContent = obj.telefone
	document.getElementById("cpf").textContent = obj.cpf

})

fetch(LINK+"/admin/usuario")
.then(resp => resp.json())
.then(data => {
	data.forEach(d => {
		const {id, login, email, nome, senha} = d
		vec.push(d)

		const option = document.createElement('option')
		option.value = vec.length-1
		option.textContent = nome
		usuario_select.appendChild(option)
	})
})
.catch(err => {
	console.error(err)
})

document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});