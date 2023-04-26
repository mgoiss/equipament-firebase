export type Client = {
  id?: string;
  nome: string;
  status: Status;
  datCadastro?: Date;
};

enum Status {
  "Ativo",
  "Inativo",
}
