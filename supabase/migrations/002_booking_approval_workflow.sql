alter table public.bookings
  drop constraint if exists bookings_no_overlapping_stays;

alter table public.bookings
  drop constraint if exists bookings_status_check;

alter table public.bookings
  add constraint bookings_status_check
  check (status in ('pending', 'confirmed', 'declined'));

alter table public.bookings
  add constraint bookings_no_overlapping_stays
  exclude using gist (
    room with =,
    daterange(check_in, check_out, '[)') with &&
  )
  where (status in ('pending', 'confirmed'));
