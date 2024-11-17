
export enum Acesso {
	ADMIN = 'ADMIN',
	PEAO = 'PEAO',
	TECNICO = 'TECNICO'
}

export enum Estado {
	PENDENTE = 'PENDENTE',
	EM_ANDAMENTO = 'EM_ANDAMENTO',
	CONCLUIDO = 'CONCLUIDO'
}

export enum TipoManutencao {
	PREDITIVA = 'PREDITIVA',
	PREVENTIVA = 'PREVENTIVA',
	CORRETIVA = 'CORRETIVA'
}

export enum GrauRisco {
	NULO = 0,
	BAIXO = 2,
	MEDIO = 5,
	GRAVE = 8,
	URGENTE = 10
}

export type Dificuldade = 1|2|3|4|5|6|7|8|9|10|GrauRisco