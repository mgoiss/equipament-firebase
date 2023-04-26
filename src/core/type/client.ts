export type Client = {
  id?: string;
  nome: string;
  status: Status;
  datCadastro?: Date;
};

export enum Status {
  "Ativo",
  "Inativo",
}
