# CRUD Login de usuarios

- Projeto de login de usuários desenvolvido em NodeJs e Express e MongoDb.

- Permite a criação de uma conta fornecendo email e senha e outros dados opcionais.

- Permite o cadastro de usuários administradores.

- trabalha com rotas protegidas onde só os administradores podem excluir algum usuário.

- Utiliza o Login JWT, onde após o login o token é emitido garantindo que o usuário não precise ficar fazendo login todas as vezes que entrar no sistema.

- Usa o módulo bcryptJs que criptografa as senhas antes de salva-las no banco.

- Usa o módulo @hapJoy, que é uma linguagem de descrição de esquema e validador de dados para JavaScript, sendo usado no projeto para validar os schemas antes de salvar no banco de 
