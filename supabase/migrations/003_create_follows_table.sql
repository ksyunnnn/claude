-- Create follows table for user follow relationships
create table if not exists public.follows (
  id uuid default uuid_generate_v4() primary key,
  follower_id uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  
  -- Prevent duplicate follows and self-follows
  unique (follower_id, following_id),
  constraint no_self_follow check (follower_id != following_id)
);

-- Enable RLS
alter table public.follows enable row level security;

-- RLS Policies for follows table
-- Anyone can view follow relationships (public by design)
create policy "Follow relationships are viewable by everyone"
  on public.follows
  for select
  using (true);

-- Users can create follows (follow others)
create policy "Users can follow others"
  on public.follows
  for insert
  with check (auth.uid() = follower_id);

-- Users can delete their own follows (unfollow)
create policy "Users can unfollow others"
  on public.follows
  for delete
  using (auth.uid() = follower_id);

-- Create indexes for performance
create index if not exists idx_follows_follower_id on public.follows(follower_id);
create index if not exists idx_follows_following_id on public.follows(following_id);

-- Composite index for efficient follower/following lookups
create index if not exists idx_follows_relationship on public.follows(follower_id, following_id);

-- Create function to get follower count
create or replace function public.get_follower_count(user_id uuid)
returns bigint as $$
begin
  return (
    select count(*)
    from public.follows
    where following_id = user_id
  );
end;
$$ language plpgsql security definer;

-- Create function to get following count
create or replace function public.get_following_count(user_id uuid)
returns bigint as $$
begin
  return (
    select count(*)
    from public.follows
    where follower_id = user_id
  );
end;
$$ language plpgsql security definer;

-- Create function to check if user A follows user B
create or replace function public.is_following(follower_id uuid, following_id uuid)
returns boolean as $$
begin
  return exists (
    select 1
    from public.follows
    where follows.follower_id = $1 and follows.following_id = $2
  );
end;
$$ language plpgsql security definer;