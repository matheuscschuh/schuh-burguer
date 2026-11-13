import { createContext, useContext, useEffect, useState } from "react";

const CarrinhoContext = createContext(null);

export default function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrinho");
      const valor = guardado ? JSON.parse(guardado) : [];
      return Array.isArray(valor) ? valor : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function removerDoCarrinho(produtoId) {
    setCarrinho(carrinho.filter((item) => item.produto.id !== produtoId));
  }
  function aumentarQuantidade(produtoId) {
    setCarrinho(
      carrinho.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }
  function diminuirQuantidade(produtoId) {
    const carrinhoAtualizado = carrinho.map((item) =>
      item.produto.id === produtoId
        ? { ...item, quantidade: item.quantidade - 1 }
        : item,
    );

    const carrinhoSemZerados = carrinhoAtualizado.filter(
      (item) => item.quantidade > 0,
    );

    setCarrinho(carrinhoSemZerados);
  }
  function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(
      (item) => item.produto.id === produto.id,
    );

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        ),
      );
    } else {
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
    }
  }
  const totalItens = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);
  function limparCarrinho() {
    setCarrinho([]);
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        adicionarAoCarrinho,
        totalItens,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
