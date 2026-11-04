import { useState, useEffect } from "react";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import Header from "./components/Header";
import ModalPedidoEnviado from "./components/ModalPedidoEnviado";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [tela, setTela] = useState("cardapio");
  const [enviado, setEnviado] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:5251/api/produtos")
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  }, []);

  useEffect(() => {
    setMensagem("");
  }, [tela]);

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

  function finalizarPedido() {
    const lista = carrinho.map((item) => ({
      produtoId: item.produto.id,
      quantidade: item.quantidade,
    }));

    setMensagem("");

    const objeto = { itens: lista };
    fetch("http://localhost:5251/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objeto),
    })
      .then((response) => {
        if (response.ok) {
          setCarrinho([]);
          setEnviado(true);
        } else {
          setMensagem(
            "Não foi possível finalizar o pedido. Confira os itens e tente novamente.",
          );
        }
      })
      .catch((erro) => {
        setMensagem(
          "Não foi possível conectar ao servidor. Tente novamente em instantes.",
        );
        console.error(erro);
      });
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        totalItens={totalItens}
        abrirCarrinho={() => setTela("carrinho")}
      />

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
          finalizarPedido={finalizarPedido}
        />
      )}
      {enviado && (
        <ModalPedidoEnviado aoFechar={() => setEnviado(false)}/>
      )}
      {mensagem && (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg"
        >
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default App;
