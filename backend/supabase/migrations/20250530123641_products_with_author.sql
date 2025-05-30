CREATE OR REPLACE VIEW products_with_author AS
SELECT
  p.*,
  u.full_name AS author_name
FROM products p
LEFT JOIN users u ON p.author = u.id;