select cron.schedule(
  'remove_deleted_products',
  '0 0 * * *', 
  $$
  delete from products
  where status = 'deleted';
  $$
);