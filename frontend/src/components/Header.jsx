export default function Header({ totalItens, abrirCarrinho }) {
  return (
    <header className="sticky top-0 z-50 bg-brand shadow-lg">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="font-display text-white text-2xl font-black tracking-tight select-none">
          Schuh Burguer
        </h1>

        <button
          onClick={abrirCarrinho}
          className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/20 transition-colors"
          aria-label={`Carrinho${totalItens > 0 ? `, ${totalItens} itens` : ""}`}
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
  );
}
