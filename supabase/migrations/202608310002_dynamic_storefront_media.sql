create table if not exists public.storefront_settings (
  id smallint primary key default 1 check (id = 1),
  site_name text not null default 'PickNQuicks',
  tagline text not null default 'Tech & Workspace Essentials',
  logo_url text,
  hero_image_url text,
  hero_alt_text text not null default 'A considered technology workspace',
  before_image_url text,
  after_image_url text,
  motion_video_url text,
  motion_video_poster_url text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

insert into public.storefront_settings(
  id,hero_image_url,before_image_url,after_image_url,motion_video_url,motion_video_poster_url
) values(
  1,
  '/images/workspace-after-v2.webp',
  '/images/workspace-before-v2.webp',
  '/images/workspace-after-v2.webp',
  '/videos/workspace-motion.mp4',
  '/images/workspace-after-v2.webp'
) on conflict (id) do nothing;

alter table public.storefront_settings enable row level security;
create policy "public storefront settings read" on public.storefront_settings
  for select using (true);
create policy "staff storefront settings manage" on public.storefront_settings
  for all using (public.is_staff()) with check (public.is_staff());

create table if not exists public.storefront_media_items (
  id uuid primary key default gen_random_uuid(),
  placement text not null check (placement in ('JOURNAL','GALLERY')),
  media_url text not null,
  alt_text text not null,
  eyebrow text,
  title text,
  body text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.storefront_media_items enable row level security;
create policy "public storefront media read" on public.storefront_media_items
  for select using (active or public.is_staff());
create policy "staff storefront media manage" on public.storefront_media_items
  for all using (public.is_staff()) with check (public.is_staff());
create index if not exists storefront_media_placement_idx
  on public.storefront_media_items(placement, active, display_order);

insert into public.storefront_media_items(placement,media_url,alt_text,eyebrow,title,body,display_order) values
  ('JOURNAL','/images/monitor-arm.webp','Monitor arm arranged on a clean workspace','Workspace notes','Start with a clearer line of sight',null,1),
  ('JOURNAL','/images/office-chair.webp','Ergonomic chair in a warm neutral setting','Buying guide','The quiet value of a supportive chair',null,2),
  ('JOURNAL','/images/keyboard.webp','Minimal keyboard on a warm desktop','The desk edit','Small tools, calmer working days',null,3),
  ('JOURNAL','/images/video-call-light.webp','Compact video light beside a desktop setup','Setup guide','Lighting that keeps calls feeling natural',null,4),
  ('GALLERY','/images/workspace-after-v2.webp','Complete warm workspace with ergonomic chair and elevated monitor','A complete setup','From empty desk to everyday workspace','Build in layers: support the body, raise the view, then add the tools you use most.',1),
  ('GALLERY','/images/monitor.webp','Slim monitor presented in a warm neutral interior','Clearer focus','Bring the important work into view','A simple display setup creates a calm centre for work, study, and play.',2),
  ('GALLERY','/images/office-chair.webp','Black ergonomic chair in a softly lit interior','Daily comfort','Start with the way the room feels','Supportive seating makes the whole setup easier to return to.',3);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
  ('site-media','site-media',true,26214400,array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','video/mp4','video/webm'])
on conflict(id) do update set
  public=excluded.public,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;
