export default function AvisoErro({ mensagem }) {
  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-lg"
    >
      {mensagem}
    </div>
  );
}
