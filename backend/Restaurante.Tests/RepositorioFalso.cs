public class RepositorioFalso : IPedidoRepository
{
    public Produto? ProdutoDevolvido;
    public List<Pedido> PedidosSalvos = new();

    public Task<Produto?> BuscarProdutoPorIdAsync(int id)
    {
        return Task.FromResult(ProdutoDevolvido);
    }

    public Task SalvarPedidoAsync(Pedido pedido)
    {
        PedidosSalvos.Add(pedido);
        return Task.CompletedTask;
    }
}