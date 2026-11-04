export default function ModalPedidoEnviado({ aoFechar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pedido-enviado-titulo"
        className="w-full max-w-md rounded-3xl bg-white px-8 py-10 text-center shadow-2xl"
      >
        <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-9 w-9 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>

        <h2
          id="pedido-enviado-titulo"
          className="mb-4 text-2xl font-bold text-slate-900"
        >
          Pedido enviado!
        </h2>

        <p className="text-base text-slate-600">
          Seu pedido foi recebido e está sendo preparado.
        </p>

        <button
          autoFocus
          onClick={aoFechar}
          className="mt-6 rounded-lg bg-brand px-5 py-2 font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
