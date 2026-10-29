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
              <div
                key={item.produto.id}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={item.produto.imagemUrl}
                    alt={item.produto.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {item.produto.nome}
                  </h3>
                  <p className="text-brand font-bold text-sm mt-1">
                    {formatarMoeda(item.produto.preco)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => diminuirQuantidade(item.produto.id)}
                    className="w-7 h-7 rounded-full border-2 border-gray-200 text-gray-500 hover:border-brand hover:text-brand flex items-center justify-center font-bold text-base transition-colors"
                    aria-label={`Diminuir ${item.produto.nome}`}
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-bold text-gray-900 text-sm">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => aumentarQuantidade(item.produto.id)}
                    className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-bold text-base hover:bg-brand-dark transition-colors"
                    aria-label={`Aumentar ${item.produto.nome}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removerDoCarrinho(item.produto.id)}
                    className="ml-1 text-gray-300 hover:text-gray-500 transition-colors"
                    aria-label={`Remover ${item.produto.nome}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
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
