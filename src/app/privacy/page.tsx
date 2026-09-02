import { LegalDocument } from '@/components/legal/legal-document';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Privacy',
  description: 'How PickNQuicks collects, uses, protects, and shares personal information.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'We collect information you give us and limited information generated as you use the storefront.',
    ],
    items: [
      'Account details such as your name, email address, authentication information, and profile image.',
      'Order details such as products, delivery address, phone number, payment status, and support history.',
      'Technical information such as browser, device, IP address, security events, and storefront activity.',
      'Preferences and communications, including settings and messages you send to us.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      'We use personal information only where needed for a clear business or legal purpose.',
    ],
    items: [
      'To create and secure accounts, process checkout, confirm payments, and fulfil orders.',
      'To provide order tracking, customer support, receipts, and important service messages.',
      'To prevent fraud, investigate misuse, maintain availability, and improve storefront performance.',
      'To meet accounting, tax, dispute, and other legal obligations.',
      'To send optional marketing only where permitted and subject to the controls we provide.',
    ],
  },
  {
    title: 'Payments and sensitive information',
    paragraphs: [
      'Payment transactions may be completed by external payment providers such as M-Pesa. We receive transaction references, status, amounts, and limited payer details needed to match and support an order. We do not need your mobile-money PIN and will never ask you to disclose it.',
    ],
  },
  {
    title: 'When information is shared',
    paragraphs: [
      'We do not sell personal information. We share only what is reasonably necessary with service providers that help us operate, including payment processors, authentication and hosting providers, email services, analytics or security vendors, and delivery partners.',
      'We may also disclose information when required by law, to protect people or the service, to investigate fraud, or as part of a business reorganization subject to appropriate safeguards.',
    ],
  },
  {
    title: 'Storage, security, and retention',
    paragraphs: [
      'We use administrative and technical safeguards designed to protect personal information. No internet service is completely secure, so please use a strong password and protect access to your device and email account.',
      'We keep information for as long as needed to provide the service, maintain transaction and tax records, resolve disputes, prevent fraud, and meet legal duties. Retention periods differ according to the type of record and why it is held.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'Subject to applicable law, you may ask to access, correct, delete, restrict, or object to certain processing of your personal information, and may request a portable copy where appropriate. You may also withdraw consent for future processing that relies on consent.',
      'Some information must be retained for completed transactions, fraud prevention, or legal compliance. We may need to verify your identity before completing a privacy request.',
    ],
  },
  {
    title: 'Cookies and local storage',
    paragraphs: [
      'The storefront may use cookies or browser storage needed for sign-in, carts, preferences, security, and performance. Blocking essential storage can prevent account or checkout features from working correctly.',
    ],
  },
  {
    title: 'Updates and contact',
    paragraphs: [
      'We may update this notice when our technology, providers, or legal obligations change. Material changes will be presented through an appropriate storefront or account notice. Use the support option below to ask a privacy question or exercise a data right.',
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Your information"
      intro="This notice explains what personal information PickNQuicks handles, why we use it, when it is shared, and the choices available to you."
      sections={sections}
      title="Data Privacy"
    />
  );
}
