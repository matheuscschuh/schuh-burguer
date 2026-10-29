// Transforma 25.99 em "R$ 25,99".
// O banco e a API guardam o número "cru"; quem formata é a tela.
export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
