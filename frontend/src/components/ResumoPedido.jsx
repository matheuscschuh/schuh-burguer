import { formatarMoeda } from "../utils/formatarMoeda";

export default function ResumoPedido({ carrinho, total, finalizarPedido }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
      <h3 className="font-bold text-gray-900 text-base mb-4">
        Resumo do Pedido
      </h3>

      <div className="flex flex-col gap-2 mb-4">
        {carrinho.map((item) => (
          <div key={item.produto.id} className="flex justify-between text-sm">
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
  );
}
