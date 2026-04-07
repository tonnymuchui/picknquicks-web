'use client';

import { EntityImageManager } from '@/components/common/entity-image-manager';
import {
  useUploadBrandLogo,
  useUploadBrandBanner,
  useRemoveBrandLogo,
  useRemoveBrandBanner,
} from '@/lib/brand/brands.mutations';

interface BrandImageManagerProps {
  brandId: string;
  logoUrl?: string;
  bannerUrl?: string;
}

export function BrandImageManager({ brandId, logoUrl, bannerUrl }: BrandImageManagerProps) {
  const uploadLogo = useUploadBrandLogo();
  const uploadBanner = useUploadBrandBanner();
  const removeLogo = useRemoveBrandLogo();
  const removeBanner = useRemoveBrandBanner();

  const images = [
    {
      url: logoUrl,
      label: 'Brand Logo',
      width: 192,
      height: 192,
      onUpload: (file: File) => uploadLogo.mutate({ id: brandId, file }),
      onRemove: () => removeLogo.mutate(brandId),
      isUploading: uploadLogo.isPending,
      isRemoving: removeLogo.isPending,
    },
    {
      url: bannerUrl,
      label: 'Brand Banner',
      width: 384,
      height: 192,
      onUpload: (file: File) => uploadBanner.mutate({ id: brandId, file }),
      onRemove: () => removeBanner.mutate(brandId),
      isUploading: uploadBanner.isPending,
      isRemoving: removeBanner.isPending,
    },
  ];

  return <EntityImageManager images={images} />;
}