-- Create likes table for command likes
create table if not exists public.likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  command_id uuid references public.commands(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  
  -- Prevent duplicate likes
  unique (user_id, command_id)
);

-- Enable RLS
alter table public.likes enable row level security;

-- RLS Policies for likes
create policy "Likes are viewable by everyone"
  on public.likes
  for select
  using (true);

create policy "Users can create likes"
  on public.likes
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
  on public.likes
  for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists idx_likes_user_id on public.likes(user_id);
create index if not exists idx_likes_command_id on public.likes(command_id);
create index if not exists idx_likes_relationship on public.likes(user_id, command_id);

-- Create function to get like count for a command
create or replace function get_like_count(command_uuid uuid)
returns bigint as $$
begin
  return (
    select count(*)
    from public.likes
    where command_id = command_uuid
  );
end;
$$ language plpgsql security definer;

-- Create function to check if user has liked a command
create or replace function has_user_liked(user_uuid uuid, command_uuid uuid)
returns boolean as $$
begin
  return exists (
    select 1
    from public.likes
    where user_id = user_uuid and command_id = command_uuid
  );
end;
$$ language plpgsql security definer;