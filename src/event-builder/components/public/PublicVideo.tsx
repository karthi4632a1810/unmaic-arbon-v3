import React from "react";
import { Play } from "lucide-react";
import type { VideoContent, EventBranding } from "../../types/event";

interface PublicVideoProps {
  content: VideoContent;
  branding: EventBranding;
}

export const PublicVideo: React.FC<PublicVideoProps> = ({ content }) => {
  // Convert standard YouTube watch link to embed format if needed
  let embedUrl = content.videoUrl;
  if (content.videoType === "youtube" && content.videoUrl.includes("watch?v=")) {
    const videoId = content.videoUrl.split("watch?v=")[1]?.split("&")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (content.videoType === "vimeo" && !content.videoUrl.includes("player.vimeo.com")) {
    const vimeoId = content.videoUrl.split("/").pop();
    embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  }

  return (
    <section className="py-20 sm:py-24 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-white text-black shadow-lg">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white leading-tight uppercase font-mono">
            {content.heading}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
          {content.videoType === "direct" ? (
            <video
              src={content.videoUrl}
              controls
              className="w-full h-full object-cover grayscale contrast-125"
            />
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={content.heading}
            />
          )}
        </div>
      </div>
    </section>
  );
};

