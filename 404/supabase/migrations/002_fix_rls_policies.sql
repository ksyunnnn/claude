-- Fix RLS policies for commands table
-- Drop existing policies
drop policy if exists "Public commands are viewable by everyone" on public.commands;
drop policy if exists "Private commands are viewable by owner" on public.commands;

-- Create new comprehensive policies
create policy "Anyone can view public commands"
  on public.commands
  for select
  using (is_public = true);

create policy "Users can view all their own commands"
  on public.commands
  for select
  using (auth.uid() = user_id);