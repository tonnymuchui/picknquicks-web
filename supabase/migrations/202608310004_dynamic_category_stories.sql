create table if not exists public.category_story_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  kind text not null check (kind in ('HERO','SCENE','GUIDE')),
  eyebrow text,
  title text not null,
  body text,
  media_url text,
  alt_text text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.category_story_items enable row level security;

create policy "public category stories read" on public.category_story_items
  for select using (active or public.is_staff());
create policy "staff category stories manage" on public.category_story_items
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists category_story_items_category_order_idx
  on public.category_story_items(category_id, active, kind, display_order);

insert into public.category_story_items(
  category_id,kind,eyebrow,title,body,media_url,alt_text,display_order
)
select c.id, seed.kind, seed.eyebrow, seed.title, seed.body, seed.media_url, seed.alt_text, seed.display_order
from public.categories c
cross join (values
  ('HERO','Displays for focused work','More room for the work that matters.','A monitor should make the day feel clearer. Compare the space you need for code, timelines, images and everyday work—then choose the screen that lets it stay in view.','/images/category-stories/displays-code.webp','Curved ultrawide monitor in a calm coding workspace',0),
  ('SCENE','For development','Keep the whole system in view.','Editor, terminal, documentation and browser can live side by side. An ultrawide canvas reduces window switching while a gentle curve keeps the far edges easier to scan.','/images/category-stories/displays-create.webp','Curved ultrawide monitor showing a design and development workflow',10),
  ('SCENE','For editing','See the cut. Trust the detail.','Give the timeline room to breathe while keeping the preview and tools visible. For colour-sensitive work, check the listed panel coverage and calibration support—not resolution alone.','/images/category-stories/displays-edit.webp','Curved monitor in a warm video editing workspace',20),
  ('GUIDE','Resolution','4K / UHD','Sharper text and generous detail for code, photography and high-resolution video. Confirm the native pixel dimensions because screen names can be used differently.',null,null,30),
  ('GUIDE','Format','Ultrawide','A wide desktop can hold two or three working areas without the break of a second bezel. Check that your laptop or dock supports the monitor’s full resolution and refresh rate.',null,null,40),
  ('GUIDE','Viewing','Curved','A subtle curve can make a wide panel feel more consistent from the centre. Curve radius, desk depth and viewing distance matter more than a dramatic specification.',null,null,50)
) as seed(kind,eyebrow,title,body,media_url,alt_text,display_order)
where c.slug = 'displays'
  and not exists (
    select 1 from public.category_story_items existing where existing.category_id = c.id
  );
