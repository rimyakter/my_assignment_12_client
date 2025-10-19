import React from "react";
import Banner from "./Banner/Banner";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import ContactUs from "./ContactUs";
import HowItWorks from "./HowItWorks";
import TestimonialSection from "./TestimonialSection";
import BloodTypeChart from "./BloodTypeChart";
import VolunteerHome from "./VolunteerHome";
import Volunteers from "./Volunteers";
import BackToHome from "./BackToHome";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <HowItWorks></HowItWorks>
      <BloodTypeChart></BloodTypeChart>
      <Volunteers></Volunteers>
      <TestimonialSection></TestimonialSection>
      <div className="mb-6">
        <ContactUs></ContactUs>
      </div>
      <BackToHome></BackToHome>
    </div>
  );
};

export default Home;
