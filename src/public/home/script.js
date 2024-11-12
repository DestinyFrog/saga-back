
const main = document.getElementById("main")
const LINK = "https://saga-back.onrender.com"

fetch(LINK+"/usuario/info")
.then(resp => resp.text())
.then(data => {
    main.innerText = data
})