create extension if not exists pgcrypto;
create table if not exists public.rsvps(
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null check(char_length(name) between 1 and 80),
 email text not null check(char_length(email)<=160),
 guest_count int not null check(guest_count between 1 and 6),
 dietary text not null default '' check(char_length(dietary)<=500),
 note text not null default '' check(char_length(note)<=1000),
 attendance jsonb not null,
 environment text not null default 'preview' check(environment in('preview','production'))
);
alter table public.rsvps enable row level security;
revoke all on public.rsvps from anon,authenticated;
create table if not exists public.rsvp_rate_limits(ip_hash text primary key,window_started_at timestamptz not null default now(),attempts int not null default 1);
alter table public.rsvp_rate_limits enable row level security;
revoke all on public.rsvp_rate_limits from anon,authenticated;
create or replace function public.check_rsvp_rate_limit(p_ip_hash text) returns boolean language plpgsql security definer set search_path=public as $$
declare rec public.rsvp_rate_limits%rowtype;
begin
 select * into rec from public.rsvp_rate_limits where ip_hash=p_ip_hash for update;
 if not found then insert into public.rsvp_rate_limits(ip_hash) values(p_ip_hash);return true;end if;
 if rec.window_started_at<now()-interval '15 minutes' then update public.rsvp_rate_limits set window_started_at=now(),attempts=1 where ip_hash=p_ip_hash;return true;end if;
 if rec.attempts>=5 then return false;end if;
 update public.rsvp_rate_limits set attempts=attempts+1 where ip_hash=p_ip_hash;return true;
end;$$;
revoke all on function public.check_rsvp_rate_limit(text) from public,anon,authenticated;