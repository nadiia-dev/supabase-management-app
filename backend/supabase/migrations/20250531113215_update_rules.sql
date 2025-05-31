alter table users enable row level security;
create policy "Allow insert via trigger" on users for insert with check (true);
