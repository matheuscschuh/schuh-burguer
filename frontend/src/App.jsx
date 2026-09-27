import { useState, useEffect } from 'react'

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5251/api/produtos")
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  return (
    // aqui vamos mostrar os produtos na tela
    <>
      {produtos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>R$ {produto.preco}</p>
        </div>
      ))}
    </>
  );
}

export default App