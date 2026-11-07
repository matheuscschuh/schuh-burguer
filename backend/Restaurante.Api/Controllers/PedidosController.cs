using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly RestauranteDbContext _context;

    public PedidosController(RestauranteDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult> CriarPedido(PedidoCriarDto dto)
    {
        // a lógica vem aqui
        if (dto.Itens.Count == 0)
        {
            return BadRequest("Lista vazia");
        }
        if (dto.Itens.Any(i => i.Quantidade <= 0))
        {
            return BadRequest("Item não possui quantidade válida");
        }

        var pedido = new Pedido();

        foreach(var itemDto in dto.Itens)
        {
            var produto = await _context.Produtos.FindAsync(itemDto.ProdutoId);

            if (produto == null)
            {
                return BadRequest("Produto não existe");
            }

            var item = new ItemPedido
            {
                ProdutoId = itemDto.ProdutoId,
                Quantidade = itemDto.Quantidade,
                PrecoUnitario = produto.Preco
            };

            pedido.Itens.Add(item);

            
        }
        _context.Pedidos.Add(pedido);
        await _context.SaveChangesAsync();

        return StatusCode(201, new { id = pedido.Id });

    }
}