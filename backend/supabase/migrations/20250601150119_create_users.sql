create table users (
  id uuid references auth.users not null primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

alter table users enable row level security;
create policy "Users can view their own data" on users for select using (auth.uid() = id);
create policy "Users can update their own data" on users for update using (auth.uid() = id);
create policy "Allow insert via trigger" on users for insert with check (true);


create or replace function public.handle_new_user()  
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.email
  ); 
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
