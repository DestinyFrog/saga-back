const LINK = "/api/v1"

const form_funcionario = document.getElementById("form-funcionario")
const but_login = document.getElementById("input-login-funcionario")
const but_senha = document.getElementById("input-password-funcionario")
const log = document.getElementById("log")

const form_admin = document.getElementById("form-admin")
const but_login_admin = document.getElementById("input-login-admin")
const but_senha_admin = document.getElementById("input-password-admin")
const log2 = document.getElementById("log2")

form_admin.addEventListener('submit', async (ev) => {
	try {
		ev.preventDefault()
		const login = but_login_admin.value
		const senha = but_senha_admin.value
		const body = { login, senha }
	
		log2.textContent = "carregando..."

		const resp = await fetch(LINK + "/auth/login-admin", {
			body: JSON.stringify(body),
			headers: { Accept: 'application/json', "Content-Type": 'application/json' },
			method: "POST"
		})

		const data = await resp.json()

		if (resp.status != 200) {
			log2.textContent = data.mensagem
		}
		else {
			location.href = "/admin"
		}

	}
	catch (err) {
		console.error(err)
	}
})

form_funcionario.addEventListener('submit', async (ev) => {
	try {
		ev.preventDefault()
		const login = but_login.value
		const senha = but_senha.value
		const body = { login, senha }
	
		log.textContent = "carregando..."

		const resp = await fetch(LINK + "/auth/login", {
			body: JSON.stringify(body),
			headers: { Accept: 'application/json', "Content-Type": 'application/json' },
			method: "POST"
		})

		const data = await resp.json()

		if (resp.status != 200) {
			log.textContent = data.mensagem
		}
		else {
			if (data.acesso == "PEAO") {
				location.href = "/func"
			}
			else if (data.acesso == "TECNICO") {
				location.href = "/tecnico/adicionar-tarefas"
			}
		}

	}
	catch (err) {
		console.error(err)
	}
})