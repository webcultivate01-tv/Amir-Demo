import React from "react";

import NewsHeroSection from "../../components/site/news/NewsHeroSection";
import FeaturedStory from "../../components/site/news/FeaturedStory";
import LatestStories from "../../components/site/news/LatestStories";
import Newsletter from "../../components/site/news/Newsletter";
import FinalCta from "../../components/site/common/FinalCta";

const NewsPage = () => (
  <main className="bg-white text-[#171719]">
    <NewsHeroSection />
    <FeaturedStory />
    <LatestStories />
    <Newsletter />
    <FinalCta />
  </main>
);

export default NewsPage;
