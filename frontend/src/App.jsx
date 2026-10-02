import { useState, useEffect } from 'react'



function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5251/api/produtos")
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.find((item) => item.produto.id === produto.id);

  if (itemExistente) {
    setCarrinho(
      carrinho.map((item) =>
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  } else {
    setCarrinho([...carrinho, { produto, quantidade: 1 }]);
  }
}

const totalItens = carrinho.reduce((total, item) => {
  return total + item.quantidade;
}, 0);

  

  return (
  <>
    <header>
      <h1>Schuh Burguer</h1>
      <p>Carrinho: {totalItens} {totalItens === 1 ? 'item' : 'itens'}</p>
    </header>

    {produtos.map((produto) => (
      <div key={produto.id}>
        <h3>{produto.nome}</h3>
        <p>R$ {produto.preco}</p>
        <p>{produto.descricao}</p>
        <img src={produto.imagemUrl} alt={produto.nome} />
        <button onClick={() => adicionarAoCarrinho(produto)}>+</button>
      </div>
    ))}
  </>
);
}

export default App