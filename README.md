

# Rotas

## Autenticação

> ### [POST] /auth/cadastrar
> > body:
> > ``` json
> > {
> >		"nome"		: "string",
> >		"email"		: "string",
> >		"telefone"	: "string",
> >		"senha"		: "string"
> > }
> > ```
> Cria novo usuário no banco de dados com os dados recebidos

> ### [POST] /auth/login
> > body:
> > ``` json
> > {
> >		"nome"		: "string",
> > 	"senha"		: "string"
> > }
> > ```
> Verifica existência do usuário no banco de dados e retorna cookie com 'id público

> ### [POST] /auth/sair
> Apaga o cookie (id público) responsável pelo login

