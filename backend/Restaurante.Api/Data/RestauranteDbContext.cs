using Microsoft.EntityFrameworkCore;

public class RestauranteDbContext : DbContext
{
    public DbSet<Produto> Produtos { get; set; }

    public RestauranteDbContext(DbContextOptions<RestauranteDbContext> options) : base(options)
    {
        
    }
}