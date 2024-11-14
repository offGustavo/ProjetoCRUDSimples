const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'provaProgScript', //IMPORTANT Alterar Aqui
  password: 'provaProgScript', //IMPORTANT Alterar Aqui
  database: 'provaProgScript', 
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Rota para obter todos os produtos
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Rota para criar um novo produto
app.post('/api/products', (req, res) => {
  const { name, value, quantity } = req.body;
  const query = 'INSERT INTO products (name, value, quantity) VALUES (?, ?, ?)';
  db.query(query, [name, value, quantity], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Produto adicionado com sucesso' });
  });
});

// Rota para atualizar um produto
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, value, quantity } = req.body;
  const query = 'UPDATE products SET name = ?, value = ?, quantity = ? WHERE id = ?';
  db.query(query, [name, value, quantity, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Produto atualizado com sucesso' });
  });
});

// Rota para deletar um produto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Produto deletado com sucesso' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


