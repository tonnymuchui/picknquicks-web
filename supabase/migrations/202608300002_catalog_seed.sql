insert into public.categories(name,slug,description,image_url,display_order) values
 ('Displays','displays','Ultrawide monitors, monitor arms, and visual tools for focused development.','/images/monitor.webp',1),
 ('Workspace','workspace','Ergonomic desks, chairs, and lighting for long, healthy work sessions.','/images/office-chair.webp',2),
 ('Connectivity','connectivity','Docks and adapters that make a laptop-first setup effortless.','/images/keyboard.webp',3),
 ('Accessories','accessories','Mice, webcams, and practical extras for work, calls, and play.','/images/video-call-light.webp',4),
 ('Complete setups','complete-setups','Thoughtful product combinations at a lower package price.','/images/workspace-after-v2.webp',5)
on conflict (slug) do nothing;

insert into public.brands(name,slug,description,country_of_origin,active,featured)
values('PickNQuicks Select','picknquicks-select','Workspace gear selected for compatibility, value, and real developer workflows.','Kenya',true,true)
on conflict (slug) do nothing;

do $$
declare v_displays uuid; v_workspace uuid; v_connectivity uuid; v_peripherals uuid; v_sets uuid; v_brand uuid;
begin
 select id into v_displays from public.categories where slug='displays';
 select id into v_workspace from public.categories where slug='workspace';
 select id into v_connectivity from public.categories where slug='connectivity';
 select id into v_peripherals from public.categories where slug='accessories';
 select id into v_sets from public.categories where slug='complete-setups';
 select id into v_brand from public.brands where slug='picknquicks-select';

 insert into public.products(category_id,brand_id,name,slug,sku,short_description,description,price,cost_price,stock_quantity,featured,display_order) values
 (v_displays,v_brand,'34-inch 4K Ultrawide Monitor','34-inch-4k-ultrawide-monitor','MON-34-4K','More room for code, terminals, design and documentation—without a second screen.','A sharp 34-inch 4K ultrawide built for deep work. The wide canvas keeps your editor, browser and terminal visible together, reduces context switching, and pairs with our 17–45-inch monitor arm for a cleaner ergonomic setup.',50000,25150,6,true,1),
 (v_workspace,v_brand,'Ergonomic Office Chair','ergonomic-office-chair','CHR-ERG-01','Adjustable support for long coding, study and creative sessions.','A breathable ergonomic chair with practical adjustment and balanced lumbar support. Chosen for people who spend serious time at a desk and need comfort that lasts beyond the first hour.',25000,13950,6,true,2),
 (v_connectivity,v_brand,'8-in-1 USB-C Dock','8-in-1-usb-c-dock','DCK-USBC-8','One cable for displays, storage, networking and everyday desk accessories.','Turn a USB-C laptop into a capable workstation with eight useful ports. Ideal for hot-desking and clean setups where power, display and accessories should connect in seconds.',1000,462,10,false,3),
 (v_workspace,v_brand,'Dual-Motor Adjustable Desk','dual-motor-adjustable-desk','DSK-DUAL-01','Quiet, stable sit–stand movement with concealed dual motors.','A stable dual-motor standing desk for people who switch posture throughout the day. Smooth height adjustment, a clean hidden drive system, and enough strength for an ultrawide workspace.',35000,16700,6,true,4),
 (v_workspace,v_brand,'Single-Motor Adjustable Desk','single-motor-adjustable-desk','DSK-SINGLE-01','An accessible sit–stand desk for compact developer workspaces.','A practical single-motor desk that brings healthy posture changes to smaller budgets and rooms. Great with one monitor, a laptop dock and a focused lighting setup.',20000,13200,6,false,5),
 (v_peripherals,v_brand,'LANGTU Wireless Mouse','langtu-wireless-mouse','MSE-LANGTU-01','Comfortable wireless control for everyday work.','A dependable LANGTU wireless mouse with a comfortable profile for browsing, spreadsheets and long development sessions. Clean desk, reliable connection, no cable drag.',3000,1500,10,false,6),
 (v_peripherals,v_brand,'Wireless Gaming Mouse','wireless-gaming-mouse','MSE-GAME-01','Responsive wireless input for work after play—and play after work.','A lightweight, responsive wireless mouse that moves easily between focused work and gaming. An affordable spare or starter mouse for a home setup.',1000,444,20,false,7),
 (v_workspace,v_brand,'Warm Table Light','warm-table-light','LMP-TABLE-01','Soft task lighting that makes late sessions feel easier.','A warm table lamp for calmer evening work, reading, and ambient video calls. Adds useful light without turning your desk into a clinical space.',5000,2450,10,false,8),
 (v_workspace,v_brand,'Eye-Caring Desk Light','eye-caring-desk-light','LMP-EYE-01','Focused, low-glare illumination for screens, notes and keyboards.','A purpose-built desk light with comfortable, even illumination for long screen sessions. Reduce harsh contrast around your monitor and keep your keyboard and notebook clear.',6500,3750,10,true,9),
 (v_displays,v_brand,'17–45-inch Heavy-Duty Monitor Arm','17-45-heavy-duty-monitor-arm','ARM-45-01','A strong single arm for large ultrawide displays.','Free your desk and place a large monitor at the correct height and distance. Designed for 17–45-inch screens and particularly suited to our 34-inch 4K ultrawide.',7000,3650,10,true,10),
 (v_displays,v_brand,'17–32-inch Monitor Arm','17-32-monitor-arm','ARM-32-01','A compact single arm for standard monitors.','A clean, adjustable monitor mount for standard 17–32-inch displays. It recovers desk space and makes ergonomic positioning simple.',4000,1950,10,false,11),
 (v_peripherals,v_brand,'2K 5MP Webcam','2k-5mp-webcam','CAM-2K-5MP','Clearer calls, demos and remote collaboration.','A sharp 2K 5MP webcam for stand-ups, client calls, interviews and content. A meaningful upgrade from most laptop cameras without unnecessary complexity.',3000,2050,10,true,12)
 on conflict (sku) do nothing;

 insert into public.product_images(product_id,image_url,alt_text,is_primary)
 select id,case
  when sku='MON-34-4K' then '/images/monitor.webp'
  when sku='CHR-ERG-01' then '/images/office-chair.webp'
  when sku like 'ARM-%' then '/images/monitor-arm.webp'
  when sku like 'LMP-%' then '/images/video-call-light.webp'
  when sku='CAM-2K-5MP' then '/images/video-call-light.webp'
  else '/images/keyboard.webp' end,name,true
 from public.products p where p.brand_id=v_brand
 on conflict do nothing;
end $$;

do $$
declare v_sets uuid; v_brand uuid; v_monitor uuid; v_arm uuid; v_desk uuid; v_lamp uuid; v_pair uuid; v_complete uuid;
begin
 select id into v_sets from public.categories where slug='complete-setups';
 select id into v_brand from public.brands where slug='picknquicks-select';
 select id into v_monitor from public.products where sku='MON-34-4K';
 select id into v_arm from public.products where sku='ARM-45-01';
 select id into v_desk from public.products where sku='DSK-DUAL-01';
 select id into v_lamp from public.products where sku='LMP-EYE-01';
 insert into public.products(category_id,brand_id,name,slug,sku,short_description,description,price,cost_price,stock_quantity,featured,is_bundle,display_order)
 values(v_sets,v_brand,'Ultrawide Focus Pair','ultrawide-focus-pair','BND-MON-ARM','34-inch 4K monitor + heavy-duty arm. Save KES 3,000.','The cleanest high-impact upgrade for a developer desk: an expansive 34-inch 4K canvas and the heavy-duty arm made to position it correctly. Buying the compatible pair removes guesswork and saves KES 3,000.',54000,28800,6,true,true,1)
 on conflict(sku) do update set price=excluded.price returning id into v_pair;
 insert into public.bundle_components values(v_pair,v_monitor,1),(v_pair,v_arm,1) on conflict do nothing;
 insert into public.product_images(product_id,image_url,alt_text,is_primary) values(v_pair,'/images/monitor-arm.webp','34-inch monitor and heavy-duty arm workspace bundle',true) on conflict do nothing;

 insert into public.products(category_id,brand_id,name,slug,sku,short_description,description,price,cost_price,stock_quantity,featured,is_bundle,display_order)
 values(v_sets,v_brand,'Complete Deep Work Station','complete-deep-work-station','BND-DEEP-WORK','Dual-motor desk, 4K ultrawide, arm and eye-caring light. Save KES 9,500.','A coordinated foundation for serious work: change posture with the dual-motor desk, see more on the 4K ultrawide, recover desk space with its matched arm, and soften long sessions with the eye-caring light.',89000,49250,6,true,true,2)
 on conflict(sku) do update set price=excluded.price returning id into v_complete;
 insert into public.bundle_components values(v_complete,v_monitor,1),(v_complete,v_arm,1),(v_complete,v_desk,1),(v_complete,v_lamp,1) on conflict do nothing;
 insert into public.product_images(product_id,image_url,alt_text,is_primary) values(v_complete,'/images/workspace-after-v2.webp','Complete adjustable developer workstation bundle',true) on conflict do nothing;
end $$;
