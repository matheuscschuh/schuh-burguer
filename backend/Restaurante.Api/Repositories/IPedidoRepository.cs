public interface IPedidoRepository
{
    Task<Produto?> BuscarProdutoPorIdAsync(int id);
    Task SalvarPedidoAsync(Pedido pedido);
}