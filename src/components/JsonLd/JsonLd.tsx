type Props = {
    data: Record<string, unknown>
    id?: string
}

/**
 * Renders a schema.org JSON-LD block. Server-rendered so crawlers see it
 * in the initial HTML without executing any JavaScript.
 */
export default function JsonLd({ data, id }: Props) {
    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
