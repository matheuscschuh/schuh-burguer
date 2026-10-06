export default function Cardapio({ produtos, adicionarAoCarrinho }) {
  return (
    <>
      {produtos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>R$ {produto.preco}</p>
          <p>{produto.descricao}</p>
          <img src={produto.imagemUrl} alt={produto.nome} />
          <button onClick={() => adicionarAoCarrinho(produto)}>+</button>
        </div>
      ))}
    </>
  );
}
