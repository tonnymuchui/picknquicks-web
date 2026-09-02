'use client';

import { Edit3, Loader2, MapPin, Plus, Power, Trash2, Truck } from 'lucide-react';
import { useState } from 'react';

import { ShippingZoneFormModal } from '@/components/admin/shipping/shipping-zone-form-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  useDeleteShippingZone,
  useSaveShippingZone,
  useShippingZones,
} from '@/lib/shipping/shipping-zones';
import { formatPriceKsh } from '@/lib/utils/currency';
import { UserRole } from '@/types/auth';

import type { ShippingZone } from '@/types/shipping';

export default function AdminShippingPage() {
  const zones = useShippingZones();
  const saveZone = useSaveShippingZone();
  const deleteZone = useDeleteShippingZone();
  const [editing, setEditing] = useState<ShippingZone | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<ShippingZone | null>(null);
  const rows = zones.data ?? [];
  const activeRows = rows.filter((zone) => zone.active);
  const coveredLocations = new Set(activeRows.flatMap((zone) => zone.cities)).size;
  const fallback = activeRows.find((zone) => zone.cities.length === 0);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (zone: ShippingZone) => {
    setEditing(zone);
    setFormOpen(true);
  };
  const toggleActive = (zone: ShippingZone) => {
    saveZone.mutate({
      id: zone.id,
      input: {
        active: !zone.active,
        cities: zone.cities,
        estimatedDays: zone.estimatedDays,
        fee: zone.fee,
        name: zone.name,
      },
    });
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="p-4 sm:p-7 xl:p-9">
        <header className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">
              Fulfilment
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
              Delivery zones
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-black/50">
              Control where you deliver, what customers pay, and the estimated delivery time shown
              at checkout.
            </p>
          </div>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white hover:bg-[#754329]"
            onClick={openCreate}
          >
            <Plus size={18} /> Add delivery zone
          </button>
        </header>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Summary label="Active zones" value={activeRows.length.toLocaleString()} />
          <Summary label="Named locations" value={coveredLocations.toLocaleString()} />
          <Summary
            label="Fallback delivery price"
            value={fallback ? formatPriceKsh(fallback.fee) : 'Missing'}
          />
        </section>

        {zones.isLoading ? (
          <div className="flex min-h-72 items-center justify-center gap-3 text-sm text-black/50">
            <Loader2 className="animate-spin" size={19} /> Loading delivery zones…
          </div>
        ) : zones.error ? (
          <div className="mt-6 border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            {zones.error.message}
          </div>
        ) : rows.length ? (
          <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-[#f1f1f1] text-[10px] font-bold uppercase tracking-[.13em] text-black/50">
                <tr>
                  <th className="p-4">Zone</th>
                  <th>Locations</th>
                  <th>Delivery time</th>
                  <th className="text-right">Customer price</th>
                  <th>Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[.07]">
                {rows.map((zone) => {
                  const protectedFallback = zone.active && zone.cities.length === 0;
                  return (
                    <tr key={zone.id} className={!zone.active ? 'bg-black/[.025] text-black/50' : ''}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-xl bg-[#f2eee7] text-[#9a5d3b]">
                            {zone.cities.length ? <MapPin size={16} /> : <Truck size={16} />}
                          </span>
                          <div>
                            <p className="font-semibold">{zone.name}</p>
                            {zone.cities.length === 0 ? (
                              <span className="text-[10px] font-semibold text-[#9a5d3b]">
                                FALLBACK ZONE
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="max-w-sm py-4 pr-5 text-xs leading-5 text-black/55">
                        {zone.cities.length ? zone.cities.join(', ') : 'Every other location'}
                      </td>
                      <td>{zone.estimatedDays} {zone.estimatedDays === 1 ? 'day' : 'days'}</td>
                      <td className="text-right font-semibold">{formatPriceKsh(zone.fee)}</td>
                      <td>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${zone.active ? 'bg-emerald-50 text-emerald-700' : 'bg-black/5 text-black/45'}`}>
                          {zone.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-1">
                          <button
                            aria-label={`Edit ${zone.name}`}
                            className="p-2 text-black/45 hover:bg-[#f2eee7] hover:text-[#754329]"
                            title="Edit"
                            onClick={() => openEdit(zone)}
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            aria-label={`${zone.active ? 'Disable' : 'Enable'} ${zone.name}`}
                            className="p-2 text-black/45 hover:bg-[#f2eee7] hover:text-[#754329] disabled:cursor-not-allowed disabled:opacity-25"
                            disabled={protectedFallback || saveZone.isPending}
                            title={protectedFallback ? 'The fallback zone must remain active' : zone.active ? 'Disable' : 'Enable'}
                            onClick={() => toggleActive(zone)}
                          >
                            <Power size={16} />
                          </button>
                          <button
                            aria-label={`Delete ${zone.name}`}
                            className="p-2 text-black/45 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-25"
                            disabled={protectedFallback}
                            title={protectedFallback ? 'The active fallback cannot be deleted' : 'Delete'}
                            onClick={() => setDeleting(zone)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 border border-dashed border-black/20 bg-white p-12 text-center">
            <Truck className="mx-auto text-black/30" size={28} />
            <p className="mt-3 text-sm text-black/50">No delivery zones have been configured.</p>
          </div>
        )}
      </div>

      <ShippingZoneFormModal
        isOpen={formOpen}
        zone={editing}
        onClose={() => setFormOpen(false)}
      />
      <ConfirmDialog
        confirmLabel="Delete zone"
        isLoading={deleteZone.isPending}
        isOpen={Boolean(deleting)}
        message={`Delete “${deleting?.name ?? ''}”? Locations in this zone will use the active fallback price.`}
        title="Delete delivery zone"
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) {
            deleteZone.mutate(deleting.id, { onSuccess: () => setDeleting(null) });
          }
        }}
      />
    </ProtectedRoute>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[.08] bg-white p-5">
      <p className="text-xs text-black/45">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-[-.03em]">{value}</p>
    </div>
  );
}

