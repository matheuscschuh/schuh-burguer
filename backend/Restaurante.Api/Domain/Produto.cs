using System.ComponentModel.DataAnnotations;

public class Produto
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; }
    [Required]
    public string Descricao { get; set; }
    [Required]
    public decimal Preco { get; set; }
    [Required]
    public string ImagemUrl { get; set; }
}