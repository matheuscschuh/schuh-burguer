import ItemCarrinho from "../components/ItemCarrinho";
import ResumoPedido from "../components/ResumoPedido";

export default function Carrinho({
  carrinho,
  setTela,
  aumentarQuantidade,
  diminuirQuantidade,
  removerDoCarrinho,
  finalizarPedido,
}) {
  const total = carrinho.reduce((acumulador, item) => {
    return acumulador + item.quantidade * item.produto.preco;
  }, 0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => setTela("cardapio")}
        className="flex items-center gap-2 text-brand font-semibold mb-6 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar ao Cardápio
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Seu Carrinho</h2>

      {carrinho.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-200 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          <p className="text-gray-400 text-lg font-medium">
            Seu carrinho está vazio
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Adicione itens do cardápio para começar
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Lista de itens */}
          <div className="flex-1 flex flex-col gap-3">
            {carrinho.map((item) => (
              <ItemCarrinho 
                key={item.produto.id}
                item={item}
                aumentarQuantidade={aumentarQuantidade}
                diminuirQuantidade={diminuirQuantidade}
                removerDoCarrinho={removerDoCarrinho}
              />
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="lg:w-72 shrink-0">
            <ResumoPedido 
              carrinho={carrinho}
              total={total}
              finalizarPedido={finalizarPedido}
            />
          </div>
        </div>
      )}
    </main>
  );
}
