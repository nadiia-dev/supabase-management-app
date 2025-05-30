create or replace view products_with_author as
select
  p.*,
  u.full_name as author_name
from products p
left join users u on p.author = u.id;