document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});



function validarProduto(idName, idSurname, idProcesso) {
    let name = document.getElementById(idName).value;
    let surname = document.getElementById(idSurname).value;
    let processo = document.querySelector(`input[name="web"]:checked`).value;

    if (name == "")
        alert("O nome não pode estar em branco. Favor preenchê-lo!");
    else if (surname == "")
        alert("O sobrenome não pode estar em branco. Favor preenchê-lo!");
    else if (!processo)
        alert("Por favor, selecione um tipo de processo!");
    else cadastrarProduto(name,surname,processo);
}


function cadastrarProduto(nome, sobrenome, processo) {
    let novoProduto = {name:nome, surname:sobrenome, process:processo};

    if (typeof(Storage)!== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; 
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); 
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}


function carregarEstoque() {
    if (typeof Storage !== "undefined") {   
        let produtos = localStorage.getItem("produtos");   

        if (produtos === null) {
            document.querySelector('.item').innerHTML = '<p>Tudo vazio</p>';  
        } else {
            produtos = JSON.parse(produtos); 

            const estoqueContainer = document.createElement('div'); 
            estoqueContainer.className = 'estoque-container';

            produtos.forEach(produto => { 
                const produtoItem = document.createElement('div');
                produtoItem.className = 'produto-item';

                produtoItem.innerHTML = `
                    <div class="produto-fundo">
                        <h2>${produto.name} </h2>
                        <h2>${produto.surname} </h2>
                        <div class="campo-item">
                            <label for="processo">Tipo de Processo:</label>
                            <span>${produto.process}</span>
                        </div>
                    </div>
                `;

                estoqueContainer.appendChild(produtoItem);  
            });

            document.querySelector('.item').innerHTML = ''; // Limpa o conteúdo existente
            document.querySelector('.item').appendChild(estoqueContainer); 
        }
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
    }
}
