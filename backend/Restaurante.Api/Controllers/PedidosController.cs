using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly PedidoService _service;

    public PedidosController(PedidoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult> CriarPedido(PedidoCriarDto dto)
    {
        try
        {
            var resultado = await _service.CriarPedidoAsync(dto);
            return StatusCode(201, new {id = resultado });
        }
        catch (PedidoInvalidoException ex)
        {
           return BadRequest(ex.Message);
        }
    }
}