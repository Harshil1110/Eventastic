// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../App.css";

// import required modules
import { Autoplay } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={1}
        className="mySwiper"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className="container swiper">
            <div className="hero-bg hero-bg1">
              <div className="hero-banner-text">
                <h2>
                  Find the Perfect <br />
                  Vendors for Your
                  <br />
                  Dream Event.
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container swiper">
            <div className="hero-bg hero-bg2">
              <div className="hero-banner-text">
                <h2>
                  Discover top Event <br />
                  Providers to Elevate <br />
                  your next occasion.
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container swiper">
            <div className="hero-bg hero-bg3">
              <div className="hero-banner-text">
                <h2>
                  Discover Our Expert <br/>
                  Engagement Photography <br/>
                  Event Solutions.
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container swiper">
            <div className="hero-bg hero-bg4">
              <div className="hero-banner-text">
                <h2>
                  Elevate Your Party <br />
                  Experience: <br />
                  Your Ultimate Party <br />
                  Event Provider.
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container swiper">
            <div className="hero-bg hero-bg5">
              <div className="hero-banner-text">
                <h2>
                  Elevate Your Party <br />
                  Experience: <br />
                  Your Ultimate Party <br />
                  Event Provider.
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
