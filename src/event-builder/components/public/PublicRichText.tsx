import React from "react";
import type { RichTextContent, EventBranding } from "../../types/event";

interface PublicRichTextProps {
  content: RichTextContent;
  branding: EventBranding;
}

export const PublicRichText: React.FC<PublicRichTextProps> = ({ content }) => {
  const alignClass =
    content.alignment === "center"
      ? "text-center mx-auto"
      : content.alignment === "right"
      ? "text-right ml-auto"
      : "text-left";

  const widthClass =
    content.containerWidth === "compact"
      ? "max-w-3xl"
      : content.containerWidth === "wide"
      ? "max-w-6xl"
      : "max-w-4xl";

  return (
    <section className="py-16 sm:py-20 bg-black text-white border-t border-zinc-900">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${widthClass}`}>
        {content.heading && (
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-6 leading-tight uppercase font-mono ${alignClass}`}
          >
            {content.heading}
          </h2>
        )}

        <div
          className={`prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4 ${alignClass}`}
          dangerouslySetInnerHTML={{ __html: content.contentHtml }}
        />
      </div>
    </section>
  );
};

