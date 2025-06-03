alter table
  products
add column
  search tsvector generated always as (to_tsvector('english', description || ' ' || title)) stored;

create index products_search on products using gin (search);
