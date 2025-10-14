interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * StructuredData component for JSON-LD schema markup
 * Improves SEO by providing structured data to search engines
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
