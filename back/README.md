# Chapeira digital


## RFs (Requisitos funcionais)

### colaborador
- [ ] Deve ser possível se cadastrar um colaborador;
- [ ] Deve ser possível se editar um colaborador;
- [ ] Deve ser possível se excluir um colaborador;
- [ ] Deve ser possível listar os usuários por loja;
- [ ] Deve ser possível listar os usuários por tipo;
- [ ] Deve ser possivel recuperar a senha


### universos
- [x] Deve ser possível cadastrar um universo;
- [] Deve ser possível editar um universo;
- [] Deve ser possível deletar um universo;
- [] Deve ser possível buscar os universos pela sigla da loja;

### lojas
- [ ] Deve ser possível obter o perfil da loja;
- [ ] Deve ser possível editar o perfil da loja;
- [x] Deve ser possível buscar uma loja pela sigla ou nome;


### adm
- [ ] Deve ser fazer login;
- [ ] Deve ser recuperar a senha;
- [ ] Deve ser possivel enviar email de relátorio

### planta da loja
- [ ] Deve ser cadastrar uma imagem;
- [ ] Deve ser editar o link da imagem;

### contatos de emergencia
- [ ] Deve ser cadastrar um contato;
- [ ] Deve ser editar um contato;

### ADM-interna
- [ ] Dever ser possivel criar uma loja
- [ ] Dever ser possivel desativar uma loja
- [ ] Dever  ser possivel ver as notas emitidas
- [] Dever ser possivel cadastrar varias notas atraves de um csv
- [] Deve ser possivel editar o status de uma nota fiscal

## RNs (Regras de negócio)

- [ ] Não deve ser possivel cadastrar o mesmo email na mesma loja;
- [x] Não deve ser possivel cadastrar duas lojas com a memsa sigla;
- [x] Não deve ser possivel cadastrar duas lojas com a mesmo cnpj;
- [ ] Só deve ser permitido realizar login usuários com a permissão de ADM;
- [] Não deve ser possivel excluir um univeso  caso tenha algum colaborador registrado;
- [x] Não deve ser possivel cadastrar universo com o nome repetido nas lojas;
- [] Não deve ser possivel deletar um usuário, apenas trocar o status para desativado;
- [] Apenas o colaborador com permissão de ADM pode realizar operações de criação e edição;
- [] Apenas o colaborador com permissão de ADM pode recuperar a senha
- [] Apos a criação da loja enviar um email para o email cadastrado com a url, email  e senha;

- [] Ao desativar uma loja, todos os colaboradores devem ser desativados e todos universos exlcuidos



## RNFs (Requisitos não-funcionais)

- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados do azure;