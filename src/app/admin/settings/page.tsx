import { StorefrontMediaForm } from '@/components/admin/settings/storefront-media-form';

export default function Page() {
  return (
    <div className="p-4 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Configuration</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-[-.04em]">Store settings</h2>
      <div className="mt-8">
        <StorefrontMediaForm />
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card
          text="Daraja environment, shortcode and passkey remain server-only environment secrets."
          title="Payments"
        />
        <Card
          text="Resend uses an idempotent outbox and your verified sending domain."
          title="Receipts"
        />
        <Card
          text="Delivery zones, fees, and estimates live in Supabase and are versionable."
          title="Delivery"
        />
        <Card text="Roles and row-level policies govern every operational view." title="Security" />
      </div>
    </div>
  );
}
function Card({ title, text }: { title: string; text: string }) {
  return (
    <section className="border border-black/10 bg-white p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-black/50">{text}</p>
    </section>
  );
}
