# Projeto de CRUD Simples de produto utilizando **React**

## Inicializando o Projeto

### Banco de Dados

Primeiro devemos criar o banco de dados, utilizaremos o MySql para armazenar os dados dos produtos.

```sql

 CREATE DATABASE provaProgScript;
 USE provaProgScript;
 CREATE TABLE products ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), value DECIMAL(10, 2), quantity INT);

```

### Backend

Nesta etapa devemos instalar as dependências necessárias no react e após concluir essa etapa inicializar o backend do projeto.

```bash

cd backend

npm install

node ./index.js

```

Devemos também editar o arquivo `index.js` para os valores que vc irá utilizar no seu computador

```javascript

const db = mysql.createConnection({
  host: 'localhost',
  user: 'seuNomeDeUsuarioAqui', 
  password: 'suaSenhaAqui', 
  database: 'provaProgScript', 
});

```

> [!WARNING]
> Não alterar o valor de `database` pois este é nome que utilizamos para criar a database no mySql
>

### Frontend

E agora iremos instalar as dependências e inicializar o frontend do projeto.

```bash

cd frontend

npm install

npm start

```
