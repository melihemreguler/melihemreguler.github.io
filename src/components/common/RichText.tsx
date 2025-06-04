import { useTranslation } from "react-i18next";

interface RichTextProps {
    i18nKey: string;
    strongClassName?: string;
    links?: Record<string, { href: string; target?: string; className?: string }>;
}

export function RichText({ 
    i18nKey, 
    strongClassName = "font-bold text-gray-900",
    links = {}
}: RichTextProps) {
    const { t } = useTranslation();
    let text = t(i18nKey);
    
    // Replace link placeholders with actual links first
    Object.entries(links).forEach(([key, linkProps]) => {
        const linkRegex = new RegExp(`<${key}>(.*?)</${key}>`, 'g');
        text = text.replace(linkRegex, `<a href="${linkProps.href}" target="${linkProps.target || '_blank'}" rel="noopener noreferrer" class="${linkProps.className || 'text-blue-600 underline hover:text-blue-800 transition-colors'}">$1</a>`);
    });
    
    // Simple regex-based parsing for <strong> tags
    const parts = text.split(/(<strong>.*?<\/strong>|<a[^>]*>.*?<\/a>)/g);
    
    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
                    const content = part.replace(/<\/?strong>/g, '');
                    return <strong key={index} className={strongClassName}>{content}</strong>;
                } else if (part.startsWith('<a ') && part.endsWith('</a>')) {
                    // Extract href, target, class from the a tag
                    const hrefMatch = part.match(/href="([^"]*)"/);
                    const targetMatch = part.match(/target="([^"]*)"/);
                    const classMatch = part.match(/class="([^"]*)"/);
                    const contentMatch = part.match(/>([^<]*)</);
                    
                    if (hrefMatch && contentMatch) {
                        return (
                            <a 
                                key={index}
                                href={hrefMatch[1]}
                                target={targetMatch?.[1] || '_blank'}
                                rel="noopener noreferrer"
                                className={classMatch?.[1] || 'text-blue-600 underline hover:text-blue-800 transition-colors'}
                            >
                                {contentMatch[1]}
                            </a>
                        );
                    }
                }
                return part || null;
            })}
        </span>
    );
}
