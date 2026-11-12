import { useState, useEffect } from "react";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import Header from "./components/Header";
import ModalPedidoEnviado from "./components/ModalPedidoEnviado";
import AvisoErro from "./components/AvisoErro";
import { useCarrinho } from "./contexts/CarrinhoContext";
import { Routes, Route } from 'react-router';

function App() {
  const [produtos, setProdutos] = useState([]);
  const { carrinho, limparCarrinho } = useCarrinho();
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
          limparCarrinho();
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
      <Header />

      <Routes>
        <Route path="/" element={ <Cardapio produtos={produtos} />} />
        <Route path="/carrinho" element={<Carrinho
          finalizarPedido={finalizarPedido}
        />} />
      </Routes>

      {enviado && <ModalPedidoEnviado aoFechar={() => setEnviado(false)} />}
      {mensagem && <AvisoErro mensagem={mensagem} />}
    </div>
  );
}

export default App;
