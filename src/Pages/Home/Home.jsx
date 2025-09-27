import React from "react";
import Banner from "./Banner/Banner";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
