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
    
    // More robust parsing - handle nested tags properly
    const parseText = (input: string): React.ReactNode[] => {
        const parts = input.split(/(<strong>.*?<\/strong>|<code>.*?<\/code>|<a[^>]*>.*?<\/a>)/g);
        
        return parts.map((part, index) => {
            if (!part) return null;
            
            if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
                const content = part.replace(/<\/?strong>/g, '');
                // Recursively parse content inside strong tags
                const innerParsed = parseText(content);
                return <strong key={index} className={strongClassName}>{innerParsed}</strong>;
            } else if (part.startsWith('<code>') && part.endsWith('</code>')) {
                const content = part.replace(/<\/?code>/g, '');
                return <code key={index} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">{content}</code>;
            } else if (part.startsWith('<a ') && part.endsWith('</a>')) {
                // Extract href, target, class from the a tag
                const hrefMatch = part.match(/href="([^"]*)"/);
                const targetMatch = part.match(/target="([^"]*)"/);
                const classMatch = part.match(/class="([^"]*)"/);
                const contentMatch = part.match(/>(.+)</);
                
                if (hrefMatch && contentMatch) {
                    const linkContent = contentMatch[1];
                    // Recursively parse content inside links
                    const innerParsed = parseText(linkContent);
                    return (
                        <a 
                            key={index}
                            href={hrefMatch[1]}
                            target={targetMatch?.[1] || '_blank'}
                            rel="noopener noreferrer"
                            className={classMatch?.[1] || 'text-blue-600 underline hover:text-blue-800 transition-colors'}
                        >
                            {innerParsed}
                        </a>
                    );
                }
            }
            return part;
        }).filter(Boolean);
    };
    
    const parsedContent = parseText(text);
    
    return (
        <span>
            {parsedContent}
        </span>
    );
}
