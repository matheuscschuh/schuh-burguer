-- Dados de exemplo do cardápio.
-- Rode depois de criar as tabelas (dotnet ef database update).
-- Só insere se a tabela "Produtos" estiver vazia, então é seguro rodar de novo.

INSERT INTO "Produtos" ("Nome", "Descricao", "Preco", "ImagemUrl")
SELECT "Nome", "Descricao", "Preco", "ImagemUrl"
FROM (VALUES
  ('Hamburguer Tradicional', 'Pão gergelim, hamburguer de carne (150g), alface, tomate, maionese verde e queijo mussarela.', 25.99, 'https://images.unsplash.com/photo-1667329829058-ac191ba4a905?w=600&h=480&fit=crop&auto=format'),
  ('Hamburguer Cheddar', 'Pão brioche, hamburguer de carne (150g), alface, tomate, maionese caseira e queijo cheddar.', 31.99, 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=600&h=480&fit=crop&auto=format'),
  ('Hamburguer Bacon', 'Pão gergelim, hamburguer de carne (150g), bacon, alface, tomate, maionese caseira e queijo cheddar.', 33.99, 'https://images.unsplash.com/photo-1635552709208-41a3d96f7bdf?w=600&h=480&fit=crop&auto=format'),
  ('Hamburguer Big', 'Pão gergelim, 2 hamburgueres de carne (150g), alface, tomate, maionese verde e queijo mussarela.', 37.99, 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=600&h=480&fit=crop&auto=format'),
  ('Hamburguer Kids', 'Pão brioche, hamburguer de carne (70g), maionese verde e queijo mussarela.', 21.99, 'https://images.unsplash.com/photo-1674938556574-78abfb2d9fb2?w=600&h=480&fit=crop&auto=format'),
  ('Hamburguer Salada', 'Pão gergelim, alface, tomate, rúcula, cebola roxa e maionese verde.', 23.99, 'https://images.unsplash.com/photo-1757834787942-40fbb707e3af?w=600&h=480&fit=crop&auto=format')
) AS v("Nome", "Descricao", "Preco", "ImagemUrl")
WHERE NOT EXISTS (SELECT 1 FROM "Produtos");
