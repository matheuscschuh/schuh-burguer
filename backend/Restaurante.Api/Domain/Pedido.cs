using System.ComponentModel.DataAnnotations;

public class Pedido
{
    [Key]
    public int Id { get; set; }

    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

    public List<ItemPedido> Itens { get; set; } = new List<ItemPedido>();
    
}