import { Link } from "react-router";

export default function NaoEncontrada() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden="true"
          className="font-display text-[10rem] font-black leading-none text-brand/10 select-none"
        >
          404
        </span>
        <div className="absolute w-24 h-24 rounded-full bg-brand text-white flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
        </div>
      </div>

      <p className="mt-8 text-sm font-bold uppercase tracking-widest text-brand">
        Erro 404
      </p>
      <h2 className="mt-2 font-display text-4xl font-black text-gray-900">
        Página não encontrada
      </h2>
      <p className="mt-4 max-w-md text-gray-500">
        Parece que este endereço não existe. Que tal voltar e escolher o seu
        hambúrguer favorito?
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border-b-2 border-brand pb-1 font-bold text-brand transition-colors hover:border-brand-dark hover:text-brand-dark"
      >
        Ir para o Cardápio <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
