create table products(
    id uuid primary key default gen_random_uuid(),
    title text,
    description text,
    image text,
    status text default 'draft',
    team_id uuid references teams(id)
);

alter table products enable row level security;
create policy "Read products from my team"
  on products
  for select
  using (
   exists(
    select 1
      from users
      where users.id = auth.uid()
        and users.team_id = products.team_id
   )
  );

create policy "Update draft products from my team"
    on products
    for update
    using(
        exists(
            select 1
            from users
            where users.id = auth.uid()
                and users.team_id = products.team_id
        )
        and status = 'draft'
    )