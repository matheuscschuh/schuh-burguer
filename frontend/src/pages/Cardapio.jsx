import ProdutoCard from "../components/ProdutoCard";

export default function Cardapio({ produtos, adicionarAoCarrinho }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Nosso Cardápio</h2>
        <p className="text-gray-500 text-sm mt-1">
          Escolha o seu favorito e adicione ao carrinho
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <ProdutoCard 
            key={produto.id}
            produto={produto}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        ))}
      </div>
    </main>
  );
}
