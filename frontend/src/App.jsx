import { useState, useEffect } from "react";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";

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
      <header className="sticky top-0 z-50 bg-brand shadow-lg">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-display text-white text-2xl font-black tracking-tight select-none">
            Schuh Burguer
          </h1>
          <button
            onClick={() => setTela("carrinho")}
            className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Carrinho"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {totalItens > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-brand text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {totalItens}
              </span>
            )}
          </button>
        </div>
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
          finalizarPedido={finalizarPedido}
        />
      )}
      {enviado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pedido-enviado-titulo"
            className="w-full max-w-md rounded-3xl bg-white px-8 py-10 text-center shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-9 w-9 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h2
              id="pedido-enviado-titulo"
              className="mb-4 text-2xl font-bold text-slate-900"
            >
              Pedido enviado!
            </h2>

            <p className="text-base text-slate-600">
              Seu pedido foi recebido e está sendo preparado.
            </p>

            <button
              autoFocus
              onClick={() => setEnviado(false)}
              className="mt-6 rounded-lg bg-brand px-5 py-2 font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Fechar
            </button>
          </div>
        </div>
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
