import { formatarMoeda } from "../utils/formatarMoeda";
import { useCarrinho } from "../contexts/CarrinhoContext";

export default function ProdutoCard({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
      <div className="bg-gray-100 h-48 overflow-hidden">
        <img
          src={produto.imagemUrl}
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-tight">
          {produto.nome}
        </h3>
        <p className="text-gray-500 text-sm mt-1 flex-1 leading-relaxed">
          {produto.descricao}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-brand font-bold text-lg">
            {formatarMoeda(produto.preco)}
          </span>
          <button
            onClick={() => adicionarAoCarrinho(produto)}
            className="w-9 h-9 rounded-full bg-brand hover:bg-brand-dark text-white flex items-center justify-center text-xl font-bold transition-colors shadow-sm active:scale-95"
            aria-label={`Adicionar ${produto.nome}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
