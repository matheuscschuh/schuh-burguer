import { formatarMoeda } from "../utils/formatarMoeda";
import { useCarrinho } from "../contexts/CarrinhoContext";

export default function ItemCarrinho({ item }) {
  const { aumentarQuantidade, diminuirQuantidade, removerDoCarrinho } =
    useCarrinho();

  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
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
  );
}
