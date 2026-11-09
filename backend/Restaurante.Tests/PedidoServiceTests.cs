namespace Restaurante.Tests;

public class PedidoServiceTests
{
    [Fact]                                  
public async Task CriarPedidoAsync_ProdutoInexistente_LancaExcecaoENaoSalvar()
{
    // PREPARAR
    var repo = new RepositorioFalso();               
    var service = new PedidoService(repo);               
    var dto = new PedidoCriarDto
    {
        Itens = new List<ItemPedidoDto> { new ItemPedidoDto { ProdutoId = 99, Quantidade = 1 } }
    };                  

    // EXECUTAR + VERIFICAR a exceção
    var ex = await Assert.ThrowsAsync<PedidoInvalidoException>(() => service.CriarPedidoAsync(dto));

    // VERIFICAR o resto
    Assert.Equal("Produto não existe", ex.Message);
    Assert.Empty(repo.PedidosSalvos);
}
}
