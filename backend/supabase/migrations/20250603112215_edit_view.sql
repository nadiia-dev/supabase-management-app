drop view if exists products_with_author;

create or replace view products_with_author(id,
  title,
  description,
  image,
  status,
  team_id,
  author,
  created_at,
  search,
  author_name
  ) as
select
  p.id,
  p.title,
  p.description,
  p.image,
  p.status,
  p.team_id,
  p.author,
  p.created_at,
  p.search, 
  u.full_name as author_name
from products p
left join users u on p.author = u.id;