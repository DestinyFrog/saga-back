const LINK = "http://localhost:3000/api/v1"

const form_funcionario = document.getElementById("form-funcionario")
const but_login = document.getElementById("input-login-functionario")
const but_senha = document.getElementById("input-password-functionario")
const log = document.getElementById("log")

form_funcionario.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const login = but_login.value
  const senha = but_senha.value

  log.textContent = "carregando..."

  fetch(LINK+"/auth/login",
  {
    body: JSON.stringify( {
      login,
      senha
    }),
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    },
    method: "POST"
  })
  .then( res => {
	res.json().then(data => {
		console.log(res.status, data.mensagem)
		if (res.status == 200) {
			console.log(res.data)
			const jwt = data.jwt
			localStorage.setItem("jwt", jwt)
			location.href = "/home"
		} else {
			log.textContent = data.mensagem
		}
	})
  } )
  .catch(err =>
    console.error(err))
})