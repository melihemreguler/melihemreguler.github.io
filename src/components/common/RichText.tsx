import { Trans } from "react-i18next";
import type { ReactElement, JSXElementConstructor } from "react";

interface RichTextProps {
    i18nKey: string;
    links?: Record<string, { href: string; target?: string; className?: string }>;
    className?: string;
    strongClassName?: string;
}

export function RichText({ 
    i18nKey, 
    links = {}, 
    className, 
    strongClassName = "font-bold text-gray-900"
}: RichTextProps) {
    // Base components for formatting
    const baseComponents: Record<string, ReactElement<unknown, string | JSXElementConstructor<any>>> = {
        strong: <span className={strongClassName} />,
        em: <span className="italic" />,
        u: <span className="underline" />,
        code: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" />,
        mark: <mark className="bg-yellow-200 px-1 rounded font-medium" />,
    };

    // Generate link components based on the links prop
    const linkComponents = Object.entries(links).reduce((acc, [key, linkProps]) => {
        acc[key] = (
            <a 
                href={linkProps.href}
                target={linkProps.target || "_blank"}
                rel="noopener noreferrer"
                className={linkProps.className || "text-blue-600 underline hover:text-blue-800 transition-colors"}
            />
        );
        return acc;
    }, {} as Record<string, ReactElement<unknown, string | JSXElementConstructor<any>>>);

    return (
        <span className={className}>
            <Trans
                i18nKey={i18nKey}
                components={{
                    ...baseComponents,
                    ...linkComponents
                }}
            />
        </span>
    );
}
