export interface ShippingZone {
  id: string;
  name: string;
  cities: string[];
  fee: number;
  estimatedDays: number;
  active: boolean;
}

export interface ShippingZoneInput {
  name: string;
  cities: string[];
  fee: number;
  estimatedDays: number;
  active: boolean;
}

