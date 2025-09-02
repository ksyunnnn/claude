-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create commands table
create table if not exists public.commands (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text not null,
  description text,
  content text not null,
  is_public boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id, slug)
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.commands enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles
  for select
  using (true);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Commands policies
create policy "Public commands are viewable by everyone"
  on public.commands
  for select
  using (is_public = true);

create policy "Private commands are viewable by owner"
  on public.commands
  for select
  using (auth.uid() = user_id and is_public = false);

create policy "Users can create own commands"
  on public.commands
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own commands"
  on public.commands
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own commands"
  on public.commands
  for delete
  using (auth.uid() = user_id);

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes for performance
create index if not exists idx_commands_user_id on public.commands(user_id);
create index if not exists idx_commands_slug on public.commands(slug);
create index if not exists idx_commands_is_public on public.commands(is_public);

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger commands_updated_at before update on public.commands
  for each row execute procedure public.handle_updated_at();