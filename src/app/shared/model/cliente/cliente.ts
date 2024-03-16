import { Telefone } from "../telefone/telefone";

export class Cliente {
    id?: number;
    nome?: string;
    cpf?: string;
    bairro?: string;
    endereco?: string;
    listaTelefone?: Telefone[];
}
