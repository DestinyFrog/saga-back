const LINK = "/api/v1"

function sair() {
	fetch(LINK+"/auth/sair",
		{
			headers: { Accept: 'application/json', "Content-Type": 'application/json' },
			method: "POST"
		}
	)
	.then(resp => {
		if (resp.status === 200) {
			location.href = "/"
		}
		else {
			console.error("erro ao tentar sair")
		}
	})
	.catch(err => {
		console.error(err)
	})
}