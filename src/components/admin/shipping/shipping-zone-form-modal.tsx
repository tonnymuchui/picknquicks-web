'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { FormInput } from '@/components/ui/form-input';
import { Modal } from '@/components/ui/modal';
import {
  shippingZoneSchema,
  type ShippingZoneFormData,
} from '@/lib/schemas/shipping-zone.schema';
import { useSaveShippingZone } from '@/lib/shipping/shipping-zones';

import type { ShippingZone } from '@/types/shipping';

export function ShippingZoneFormModal({
  isOpen,
  onClose,
  zone,
}: {
  isOpen: boolean;
  onClose: () => void;
  zone: ShippingZone | null;
}) {
  const saveZone = useSaveShippingZone();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ShippingZoneFormData>({
    resolver: zodResolver(shippingZoneSchema),
    defaultValues: { active: true, citiesText: '', estimatedDays: 2, fee: 0, name: '' },
  });
  const citiesText = useWatch({ control, name: 'citiesText' });
  const isFallback = !citiesText?.split(/[\n,]/).some((city) => city.trim());
  const protectedFallback = Boolean(zone?.active && zone.cities.length === 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    reset(
      zone
        ? {
            active: zone.active,
            citiesText: zone.cities.join('\n'),
            estimatedDays: zone.estimatedDays,
            fee: zone.fee,
            name: zone.name,
          }
        : { active: true, citiesText: '', estimatedDays: 2, fee: 0, name: '' }
    );
  }, [isOpen, reset, zone]);

  const submit = (values: ShippingZoneFormData) => {
    const cities = values.citiesText
      .split(/[\n,]/)
      .map((city) => city.trim())
      .filter(Boolean);
    saveZone.mutate(
      {
        id: zone?.id,
        input: {
          active: values.active,
          cities,
          estimatedDays: values.estimatedDays,
          fee: values.fee,
          name: values.name,
        },
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal
      description="Set the locations, customer delivery price, and expected delivery time."
      isOpen={isOpen}
      size="lg"
      title={zone ? 'Edit delivery zone' : 'Add delivery zone'}
      onClose={onClose}
    >
      <form className="space-y-5" onSubmit={handleSubmit(submit)}>
        <FormInput
          required
          error={errors.name?.message}
          label="Zone name"
          placeholder="Nairobi and nearby"
          {...register('name')}
        />

        <div>
          <label className="mb-1.5 block text-xs font-semibold" htmlFor="shipping-zone-cities">
            Locations
          </label>
          <textarea
            {...register('citiesText')}
            className={`border-line min-h-32 w-full border bg-white px-4 py-3 text-sm outline-none focus:border-black ${errors.citiesText ? 'border-red-700' : ''}`}
            id="shipping-zone-cities"
            placeholder={'nairobi\nkiambu\nruaka'}
          />
          {errors.citiesText ? (
            <p className="mt-1.5 text-xs text-red-700">{errors.citiesText.message}</p>
          ) : (
            <p className="mt-1.5 text-xs text-black/45">
              Enter one city or town per line, or separate them with commas.
            </p>
          )}
        </div>

        {isFallback ? (
          <div className="rounded-xl bg-[#f2eee7] p-3.5 text-xs leading-5 text-[#754329]">
            With no locations listed, this becomes the fallback price for every place not covered
            by another active zone.
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            required
            error={errors.fee?.message}
            label="Delivery price"
            min={0}
            prefix="KES"
            step="0.01"
            type="number"
            {...register('fee', { valueAsNumber: true })}
          />
          <FormInput
            required
            error={errors.estimatedDays?.message}
            label="Estimated delivery days"
            min={1}
            step={1}
            type="number"
            {...register('estimatedDays', { valueAsNumber: true })}
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-black/10 p-4">
          <input
            {...register('active')}
            className="mt-0.5 size-4 accent-[#9a5d3b]"
            disabled={protectedFallback}
            type="checkbox"
          />
          <span>
            <span className="block text-sm font-semibold">Available at checkout</span>
            <span className="mt-0.5 block text-xs text-black/45">
              {protectedFallback
                ? 'The active fallback cannot be disabled; edit its price or delivery time instead.'
                : 'Inactive zones remain saved but are not used for new orders.'}
            </span>
          </span>
        </label>

        <div className="flex justify-end gap-2 border-t border-black/10 pt-5">
          <button
            className="min-h-11 border border-black/15 px-5 text-sm font-semibold"
            disabled={saveZone.isPending}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="inline-flex min-h-11 items-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white disabled:opacity-50"
            disabled={saveZone.isPending}
            type="submit"
          >
            {saveZone.isPending ? <Loader2 className="animate-spin" size={16} /> : null}
            {zone ? 'Save changes' : 'Add zone'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

