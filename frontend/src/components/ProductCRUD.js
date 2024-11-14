import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', value: '', quantity: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const API_URL = 'http://localhost:8800/api/products';

  const loadProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      setMessage({ text: 'Erro ao carregar produtos', type: 'danger' });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`${API_URL}/${form.id}`, form);
        setMessage({ text: 'Produto atualizado com sucesso!', type: 'success' });
      } else {
        await axios.post(API_URL, form);
        setMessage({ text: 'Produto adicionado com sucesso!', type: 'success' });
      }
      setForm({ name: '', value: '', quantity: '' });
      loadProducts();
    } catch (err) {
      setMessage({ text: 'Erro ao salvar produto', type: 'danger' });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage({ text: 'Produto deletado com sucesso!', type: 'success' });
      loadProducts();
    } catch (err) {
      setMessage({ text: 'Erro ao deletar produto', type: 'danger' });
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">CRUD de Produtos</h1>

      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Valor</label>
          <input
            type="number"
            className="form-control"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Quantidade</label>
          <input
            type="number"
            className="form-control"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {form.id ? 'Atualizar Produto' : 'Adicionar Produto'}
        </button>
      </form>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.value}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => setForm(product)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCRUD;
