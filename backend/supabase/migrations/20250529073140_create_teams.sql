create table teams (
  id uuid primary key default gen_random_uuid(),
  team_name text,
  invite_link text unique,
  owner_id uuid references users(id),
  created_at timestamp with time zone default now()
);

alter table users
add column team_id uuid references teams(id);

alter table teams enable row level security;
create policy "Team members and owner can view team" on teams for select using (id = (select team_id from users where id = auth.uid()));
create policy "Anyone can create a team" on teams for insert with check (owner_id = auth.uid());
create policy "Only owner can update team" on teams for update using (owner_id = auth.uid());
create policy "Only owner can delete team" on teams for delete using (owner_id = auth.uid());