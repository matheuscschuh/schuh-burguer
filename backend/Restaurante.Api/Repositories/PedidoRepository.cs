public class PedidoRepository : IPedidoRepository
{
    private readonly RestauranteDbContext _context;

    public PedidoRepository(RestauranteDbContext context)
    {
        _context = context;
    }

    public async Task<Produto?> BuscarProdutoPorIdAsync(int id)
    {
        return await _context.Produtos.FindAsync(id);
    }

    public async Task SalvarPedidoAsync(Pedido pedido)
    {
        _context.Pedidos.Add(pedido);
        await _context.SaveChangesAsync();
    }
}