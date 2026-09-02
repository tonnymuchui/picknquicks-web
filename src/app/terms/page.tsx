import { LegalDocument } from '@/components/legal/legal-document';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms governing use of the PickNQuicks storefront and purchases made through it.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    title: 'Using PickNQuicks',
    paragraphs: [
      'These terms apply when you browse our storefront, create an account, or place an order. By using the service, you agree to these terms and confirm that the information you provide is accurate and current.',
      'You must use the storefront lawfully and must not attempt to disrupt it, access another person’s account, introduce harmful code, or misuse its content or systems.',
    ],
  },
  {
    title: 'Products, prices, and availability',
    paragraphs: [
      'We aim to present product descriptions, images, prices, taxes, and availability accurately. Screen settings and supplier updates can cause minor differences, and an item may become unavailable before an order is confirmed.',
      'Prices are shown in Kenyan shillings unless stated otherwise. The total presented at checkout includes the charges shown there, including any applicable delivery cost.',
    ],
  },
  {
    title: 'Orders and payment',
    paragraphs: [
      'Submitting checkout information is an offer to purchase. An order is accepted when we confirm it. We may decline or cancel an order affected by unavailable stock, an evident pricing error, suspected fraud, or information we cannot verify.',
      'Available payment methods are shown during checkout. You authorize us and our payment providers to process the amount displayed and to use the order and contact details needed to complete or verify the transaction.',
    ],
  },
  {
    title: 'Delivery, collection, and risk',
    paragraphs: [
      'Delivery options, charges, and estimates are displayed during checkout when available. Estimates are not guarantees and may be affected by location, stock handling, couriers, weather, or events outside our reasonable control.',
      'Please provide a reachable contact and accurate delivery information. Responsibility for an item passes to you when it is delivered to, or collected by, you or a person you authorize.',
    ],
  },
  {
    title: 'Cancellations, returns, and refunds',
    paragraphs: [
      'Contact order support as soon as possible if you need to change or cancel an order. Whether a change is possible depends on the order’s payment and fulfilment status.',
      'Return and refund eligibility depends on the item’s condition, the reason for return, supplier or manufacturer terms, and rights that cannot lawfully be excluded. Keep proof of purchase and report damaged, incorrect, or defective items promptly.',
    ],
  },
  {
    title: 'Accounts and communications',
    paragraphs: [
      'You are responsible for protecting your sign-in credentials and for activity performed through your account. Tell us promptly if you believe your account has been accessed without permission.',
      'We may send service communications needed to manage your account, payment, delivery, security, or order. Marketing communications, where offered, can be managed using the controls provided with them.',
    ],
  },
  {
    title: 'Intellectual property and third-party services',
    paragraphs: [
      'The storefront design, original text, graphics, branding, and software are owned by PickNQuicks or used with permission. You may use the site for personal shopping but may not reproduce or commercially exploit protected material without permission.',
      'Payments, authentication, delivery, and other features may rely on third parties. Their own terms may apply to the services they provide.',
    ],
  },
  {
    title: 'Responsibility and changes',
    paragraphs: [
      'Nothing in these terms limits rights or responsibilities that cannot be limited under applicable law. To the extent the law permits, we are not responsible for indirect losses or for interruptions caused by events beyond our reasonable control.',
      'We may update these terms when our storefront, practices, or legal duties change. The updated date identifies the version in effect. Continued use after an update means the revised terms apply to later activity.',
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Store policies"
      intro="These terms explain the rules that apply when you use PickNQuicks, create an account, or buy technology and workspace products from us."
      sections={sections}
      title="Terms and Conditions"
    />
  );
}
