import { useState, useEffect } from "react";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [tela, setTela] = useState("cardapio");

  useEffect(() => {
    fetch("http://localhost:5251/api/produtos")
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  }, []);

  function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(
      (item) => item.produto.id === produto.id,
    );

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        ),
      );
    } else {
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
    }
  }

  function aumentarQuantidade(produtoId) {
    setCarrinho(
      carrinho.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuirQuantidade(produtoId) {
    const carrinhoAtualizado = carrinho.map((item) =>
      item.produto.id === produtoId
        ? { ...item, quantidade: item.quantidade - 1 }
        : item,
    );

    const carrinhoSemZerados = carrinhoAtualizado.filter(
      (item) => item.quantidade > 0,
    );

    setCarrinho(carrinhoSemZerados);
  }

  function removerDoCarrinho(produtoId) {
    setCarrinho(carrinho.filter((item) => item.produto.id !== produtoId));
  }

  const totalItens = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);

  return (
    <>
      <header>
        <h1>Schuh Burguer</h1>
        <button onClick={() => setTela("carrinho")}>
          Carrinho: {totalItens} {totalItens === 1 ? "item" : "itens"}
        </button>
      </header>

      {tela === "cardapio" ? (
        <Cardapio
          produtos={produtos}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      ) : (
        <Carrinho
          carrinho={carrinho}
          setTela={setTela}
          aumentarQuantidade={aumentarQuantidade}
          diminuirQuantidade={diminuirQuantidade}
          removerDoCarrinho={removerDoCarrinho}
        />
      )}
    </>
  );
}

export default App;
