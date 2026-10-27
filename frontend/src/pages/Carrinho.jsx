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
    <>
      <button onClick={() => setTela("cardapio")}>Voltar ao Cardápio</button>
      {carrinho.length == 0 ? (
        <p>Carrinho está vazio</p>
      ) : (
        <>
          {carrinho.map((item) => (
            <div key={item.produto.id}>
              <h3>{item.produto.nome}</h3>
              <p>R$ {item.produto.preco}</p>
              <p>{item.produto.descricao}</p>
              <p>{item.quantidade}</p>
              <img src={item.produto.imagemUrl} alt={item.produto.nome} />
              <button onClick={() => aumentarQuantidade(item.produto.id)}>
                +
              </button>
              <button onClick={() => diminuirQuantidade(item.produto.id)}>
                -
              </button>
              <button onClick={() => removerDoCarrinho(item.produto.id)}>
                lixeira
              </button>
            </div>
          ))}
          <p>Total: R$ {total.toFixed(2)}</p>
          <button onClick={finalizarPedido}>Finalizar Pedido</button>
        </>
      )}
    </>
  );
}
