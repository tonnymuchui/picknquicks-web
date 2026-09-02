import Link from 'next/link';

import { StorefrontGalleryManager } from '@/components/admin/settings/storefront-gallery-manager';
export default function Page() {
  return (
    <div className="p-4 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Merchandising</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-[-.04em]">Bundles & offers</h2>
      <p className="mt-3 max-w-xl text-sm text-black/50">
        Group products that work well together and set a clear bundle price.
      </p>
      <div className="mt-8 border border-black/10 bg-white p-7">
        <h3 className="text-xl font-semibold">Workspace combinations</h3>
        <p className="mt-2 text-sm text-black/50">
          Manage monitor and arm, desk and lamp, and complete workspace combinations.
        </p>
        <Link
          className="mt-6 inline-flex bg-[#9a5d3b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#754329]"
          href="/admin/products"
        >
          Manage bundle products
        </Link>
      </div>
      <StorefrontGalleryManager />
    </div>
  );
}
