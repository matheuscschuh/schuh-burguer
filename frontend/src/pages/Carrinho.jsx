import ItemCarrinho from "../components/ItemCarrinho";
import { formatarMoeda } from "../utils/formatarMoeda";

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
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-gray-900 text-base mb-4">
                Resumo do Pedido
              </h3>

              <div className="flex flex-col gap-2 mb-4">
                {carrinho.map((item) => (
                  <div
                    key={item.produto.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600 truncate pr-2">
                      {item.quantidade}× {item.produto.nome}
                    </span>
                    <span className="text-gray-800 font-medium shrink-0">
                      {formatarMoeda(item.produto.preco * item.quantidade)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-black text-brand text-xl">
                  {formatarMoeda(total)}
                </span>
              </div>

              <button
                onClick={finalizarPedido}
                className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl text-base transition-colors active:scale-95 shadow-md"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
