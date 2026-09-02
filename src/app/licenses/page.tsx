import { LegalDocument } from '@/components/legal/legal-document';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licenses',
  description: 'Licensing information for PickNQuicks content and third-party software.',
  alternates: { canonical: '/licenses' },
};

const sections = [
  {
    title: 'PickNQuicks content',
    paragraphs: [
      'Unless a different notice is displayed, the PickNQuicks name, brand elements, storefront design, original copy, graphics, and other original material are protected and may not be copied, modified, redistributed, or used commercially without written permission.',
      'Viewing the storefront does not transfer ownership. You receive only the limited right needed to access and use it for lawful personal shopping and account management.',
    ],
  },
  {
    title: 'Product names and trademarks',
    paragraphs: [
      'Product names, manufacturer logos, and other third-party marks belong to their respective owners. Their appearance identifies products or compatibility and does not imply sponsorship or endorsement unless expressly stated.',
    ],
  },
  {
    title: 'Product images and media',
    paragraphs: [
      'Images, video, specifications, and promotional material may be owned by PickNQuicks, a manufacturer, a supplier, or another licensor. They are presented for shopping and product-information purposes and may carry separate usage restrictions.',
    ],
  },
  {
    title: 'Open-source software',
    paragraphs: [
      'This storefront is built with open-source software. Each dependency remains subject to its own license and copyright notice. Those licenses apply to the relevant software components and do not place PickNQuicks branding or original content under the same terms.',
      'The authoritative dependency list and applicable license texts are the versions distributed with the deployed application, its package manifests, and the source repositories maintained by each software publisher.',
    ],
  },
  {
    title: 'Third-party services',
    paragraphs: [
      'Hosted infrastructure, authentication, payment, communications, maps, analytics, and delivery integrations may include software or content licensed directly by their providers. Use of those services may be governed by their own terms and licenses.',
    ],
  },
  {
    title: 'Reporting a concern',
    paragraphs: [
      'If you believe material on PickNQuicks infringes a copyright, trademark, or other right, contact us with the material’s location, the right involved, your contact information, and enough detail for us to review the request.',
    ],
  },
] as const;

export default function LicensesPage() {
  return (
    <LegalDocument
      eyebrow="Content and software"
      intro="This page explains the permissions and ownership that apply to PickNQuicks materials, product media, trademarks, and third-party software."
      sections={sections}
      title="Licenses"
    />
  );
}
