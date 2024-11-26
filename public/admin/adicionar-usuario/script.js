
const inp_login = document.getElementById("firstname")
const inp_nome = document.getElementById("lastname")
const inp_email = document.getElementById("email")
const inp_telefone = document.getElementById("number")
const inp_CPF = document.getElementById("cpf")
const inp_senha = document.getElementById("password")
const inp_acesso_chefe = document.getElementById("chefe")
const inp_acesso_tecnico = document.getElementById("tecnico")
const inp_acesso_func = document.getElementById("funci")
const submit = document.getElementById("submit")

submit.addEventListener('click', (ev) => {
	const acesso = inp_acesso_chefe.checked?"ADMIN":(inp_acesso_tecnico.checked?"TECNICO":"PEAO")

	const body = {
		login: inp_login.value,
		nome: inp_nome.value,
		email: inp_email.value,
		telefone: inp_telefone.value,
		cpf: inp_CPF.value,
		senha: inp_senha.value,
		acesso
	}

	fetch(LINK+"/admin/usuario", {
		body: JSON.stringify(body),
		headers: { Accept: 'application/json', "Content-Type": 'application/json' },
		method: "POST"
	})
	.then(resp => resp.json())
	.then(data => {
		console.log(data)
		location.href = "/admin"
	})
	.catch(err => {
		console.error(err)
	})
})