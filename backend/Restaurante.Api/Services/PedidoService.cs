public class PedidoService
{
    private readonly IPedidoRepository _repo;

    public PedidoService(IPedidoRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> CriarPedidoAsync(PedidoCriarDto dto)
    {
        if (dto.Itens.Count == 0)
        {
            throw new PedidoInvalidoException("Lista vazia");
        }
        if (dto.Itens.Any(i => i.Quantidade <= 0))
        {
            throw new PedidoInvalidoException("Item não possui quantidade válida");
        }

        var pedido = new Pedido();

        foreach(var itemDto in dto.Itens)
        {
            var produto = await _repo.BuscarProdutoPorIdAsync(itemDto.ProdutoId);

            if (produto == null)
            {
                throw new PedidoInvalidoException("Produto não existe");
            }

            var item = new ItemPedido
            {
                ProdutoId = itemDto.ProdutoId,
                Quantidade = itemDto.Quantidade,
                PrecoUnitario = produto.Preco
            };

            pedido.Itens.Add(item);

            
        }

        await _repo.SalvarPedidoAsync(pedido);
        return pedido.Id;
    }
}