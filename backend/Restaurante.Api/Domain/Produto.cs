using System.ComponentModel.DataAnnotations;

public class Produto
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; } = string.Empty;
    [Required]
    public string Descricao { get; set; } = string.Empty;
    public decimal Preco { get; set; } 
    [Required]
    public string ImagemUrl { get; set; } = string.Empty;
}