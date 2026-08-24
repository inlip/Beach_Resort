create extension if not exists btree_gist;

create table if not exists public.bookings (
  id text primary key,
  guest_name text not null,
  guest_phone text not null,
  guest_email text not null,
  check_in date not null,
  check_out date not null,
  adults integer not null check (adults between 1 and 6),
  children integer not null check (children between 0 and 4),
  room text not null,
  nights integer not null check (nights > 0),
  requests text not null default '',
  total_inr integer not null check (total_inr >= 0),
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  check (check_out > check_in)
);

create index if not exists bookings_room_dates_idx on public.bookings (room, check_in, check_out);

alter table public.bookings enable row level security;

do $$ begin
  alter table public.bookings add constraint bookings_no_overlapping_stays
    exclude using gist (room with =, daterange(check_in, check_out, '[)') with &&);
exception when duplicate_object then null;
end $$;
