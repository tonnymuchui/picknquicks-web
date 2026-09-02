type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdValue }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script dangerouslySetInnerHTML={{ __html: json }} type="application/ld+json" />;
}
