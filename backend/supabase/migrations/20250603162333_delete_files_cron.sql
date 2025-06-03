create or replace function delete_unused_images_products()
returns void as $$
declare
  file record;
begin
  for file in
    select name, bucket_id from storage.objects
    where (bucket_id = 'products') 
    and name not in (
     select regexp_replace(image, '^.+/public/products/', '')
     from public.products where image is not null
  )
  loop
    perform storage.delete_object(bucket_id, file.name);
  end loop;
end;
$$ language plpgsql;

create or replace function delete_unused_avatars()
returns void as $$
declare
  file record;
begin
  for file in
    select name, bucket_id from storage.objects
    where (bucket_id = 'avatars') 
    and name not in (
     select regexp_replace(avatar_url, '^.+/public/avatars/', '')
     from public.users where avatar_url is not null
  )
  loop
    perform storage.delete_object(bucket_id, file.name);
  end loop;
end;
$$ language plpgsql;

select cron.schedule(
  'remove_unused_images_products',
  '0 0 * * *', 
  $$select delete_unused_images_products();$$
);

select cron.schedule(
  'remove_unused_avatars',
  '0 0 * * *', 
  $$select delete_unused_avatars();$$
);