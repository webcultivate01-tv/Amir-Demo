import React, { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { trendVideos, trendArticle, pressItem } from "../../../../data/newsMagazine";
import { Eyebrow, SectionHeading } from "./Ornaments";
import Reveal from "./Reveal";

/* Privacy-friendly lazy embed: shows a local thumbnail + play button,
   and only talks to YouTube once the viewer clicks play. */
const VideoCard = ({ video, delay = 0 }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal as="article" delay={delay} className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_-12px_rgba(17,17,17,0.12)]">
      <div className="relative aspect-video w-full overflow-hidden bg-mag-ink">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
          >
            <img src={video.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <span className="absolute inset-0 bg-mag-ink/30 transition-colors group-hover:bg-mag-ink/20" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 text-mag-accent" fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <Eyebrow>Video</Eyebrow>
        <h4 className="mt-2 font-syne text-[15px] font-bold leading-snug text-mag-ink">{video.title}</h4>
      </div>
    </Reveal>
  );
};

export default function NewsTrends() {
  return (
    <section aria-labelledby="news-trends-title" className="bg-mag-offwhite px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <Eyebrow className="justify-center">Media</Eyebrow>
          <SectionHeading id="news-trends-title" className="mt-3">
            News &amp; Trends
          </SectionHeading>
          <p className="mt-4 font-sans text-[15px] leading-7 text-mag-ink/70">
            Keeping up with what&rsquo;s new in fresh food.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {trendVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} delay={i * 80} />
          ))}

          <Reveal
            as="a"
            delay={trendVideos.length * 80}
            href={`#story-${trendArticle.id}`}
            className="group overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_-12px_rgba(17,17,17,0.12)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img src={trendArticle.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <Eyebrow>{trendArticle.label}</Eyebrow>
              <h4 className="mt-2 font-syne text-[15px] font-bold leading-snug text-mag-ink">{trendArticle.title}</h4>
              <p className="mt-1.5 line-clamp-2 font-sans text-[13px] leading-[1.6] text-mag-ink/65">{trendArticle.excerpt}</p>
            </div>
          </Reveal>

          <Reveal
            as="a"
            delay={(trendVideos.length + 1) * 80}
            href={`#story-${pressItem.id}`}
            className="group overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_-12px_rgba(17,17,17,0.12)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
          >
            <div className="flex aspect-video w-full items-center justify-center overflow-hidden" style={{ background: pressItem.imageBg }}>
              <img src={pressItem.image} alt="" loading="lazy" className="h-2/3 w-2/3 object-contain" />
            </div>
            <div className="p-5">
              <Eyebrow>{pressItem.label}</Eyebrow>
              <h4 className="mt-2 font-syne text-[15px] font-bold leading-snug text-mag-ink">{pressItem.title}</h4>
              <p className="mt-1.5 line-clamp-2 font-sans text-[13px] leading-[1.6] text-mag-ink/65">{pressItem.excerpt}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#news-trends-title"
            className="group inline-flex items-center gap-2 font-poppins text-[13px] font-bold uppercase tracking-[0.1em] text-mag-crimson hover:text-mag-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
          >
            View all videos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
