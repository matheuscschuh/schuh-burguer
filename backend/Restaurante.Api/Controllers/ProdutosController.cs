using System.Security.AccessControl;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly RestauranteDbContext _context;

    public ProdutosController(RestauranteDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Produto>>> GetProdutos()
    {
        
        return Ok(await _context.Produtos.ToListAsync());
    }
}