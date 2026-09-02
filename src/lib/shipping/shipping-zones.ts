'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase/client';

import type { ShippingZone, ShippingZoneInput } from '@/types/shipping';

type ShippingZoneRow = {
  id: string;
  name: string;
  cities: string[];
  fee: number | string;
  estimated_days: number;
  active: boolean;
};

export const shippingZoneKeys = {
  all: ['shipping-zones'] as const,
};

function mapZone(row: ShippingZoneRow): ShippingZone {
  return {
    id: row.id,
    name: row.name,
    cities: row.cities,
    fee: Number(row.fee),
    estimatedDays: row.estimated_days,
    active: row.active,
  };
}

function zonePatch(input: ShippingZoneInput) {
  return {
    name: input.name.trim(),
    cities: [...new Set(input.cities.map((city) => city.trim().toLowerCase()).filter(Boolean))],
    fee: input.fee,
    estimated_days: input.estimatedDays,
    active: input.active,
  };
}

export function useShippingZones() {
  return useQuery({
    queryKey: shippingZoneKeys.all,
    queryFn: async (): Promise<ShippingZone[]> => {
      const { data, error } = await createClient()
        .from('shipping_zones')
        .select('id,name,cities,fee,estimated_days,active')
        .order('name');
      if (error) {
        throw new Error(error.message);
      }
      return ((data ?? []) as ShippingZoneRow[])
        .map(mapZone)
        .sort((a, b) => Number(b.active) - Number(a.active) || Number(a.cities.length === 0) - Number(b.cities.length === 0) || a.name.localeCompare(b.name));
    },
  });
}

export function useSaveShippingZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id?: string; input: ShippingZoneInput }) => {
      const supabase = createClient();
      const query = id
        ? supabase.from('shipping_zones').update(zonePatch(input)).eq('id', id)
        : supabase.from('shipping_zones').insert(zonePatch(input));
      const { data, error } = await query
        .select('id,name,cities,fee,estimated_days,active')
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return mapZone(data as ShippingZoneRow);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: shippingZoneKeys.all });
      toast.success(variables.id ? 'Delivery zone updated' : 'Delivery zone created');
    },
    onError: (error: Error) => toast.error(error.message || 'Unable to save delivery zone'),
  });
}

export function useDeleteShippingZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await createClient().from('shipping_zones').delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shippingZoneKeys.all });
      toast.success('Delivery zone deleted');
    },
    onError: (error: Error) => toast.error(error.message || 'Unable to delete delivery zone'),
  });
}

