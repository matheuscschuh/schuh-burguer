using Microsoft.EntityFrameworkCore;

public class RestauranteDbContext : DbContext
{
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<ItemPedido> ItensPedido { get; set; }

    public RestauranteDbContext(DbContextOptions<RestauranteDbContext> options) : base(options)
    {
        
    }
}