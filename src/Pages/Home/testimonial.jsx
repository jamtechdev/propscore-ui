import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "./homepage.css";

export default function Testimonial() {
  return (
    <section className="what-our-clients how-it-work--section">
      <div className="container px-0">
        <div className="d-flex align-items-start what-our-clients-container justify-content-between gap-3 mb-5">
          <div className="content">
            <h2 className="secondary-title">
              What <span>Our Clients</span> Say
            </h2>
            <p className="para">
              From confident first-time purchases to faster deals and better
              returns — PropScore™ is changing how people evaluate property.
            </p>
          </div>
          <button className="login-btn d-flex align-items-center gap-2 justify-content-center">
            Get Your Score Now <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          className="testimonialSwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="testimonial-content">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="stars">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((s, i) => (
                      <span className="star" key={i}>
                        {s}
                      </span>
                    ))}
                </div>
                <div className="date">May 20, 2024</div>
              </div>
              <p className="testimonial-text">
                "
                <span>
                  Propscore has completely changed how I work with competitive
                  market
                </span>
                analysis and builds trust. Clients appreciate the transparency
                and I close deals faster."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/imgs/agents.png" alt="Agent" />
              </div>
              <div className="author-info">
                <div className="author-name">Jennifer R.</div>
                <div className="author-role">Real Estate Agent</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-content">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="stars">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((s, i) => (
                      <span className="star" key={i}>
                        {s}
                      </span>
                    ))}
                </div>
                <div className="date">May 20, 2024</div>
              </div>
              <p className="testimonial-text">
                <span>
                  We were overwhelmed trying to compare neighborhoods and
                  listings — Propscore made it simple.
                </span>
                We found a home that was not just beautiful but actually a smart
                investment that gave us peace of mind and confidence in our
                decision."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/imgs/agents.png" alt="Agent" />
              </div>
              <div className="author-info">
                <div className="author-name">Sarah S. James M.</div>
                <div className="author-role">First-time Buyer</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-content">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="stars">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((s, i) => (
                      <span className="star" key={i}>
                        {s}
                      </span>
                    ))}
                </div>
                <div className="date">May 20, 2024</div>
              </div>
              <p className="testimonial-text">
                "
                <span>
                  I screen dozens of properties a week — Propscore saves me
                  hours.
                </span>
                It instantly highlights high-potential red flags hidden risks.
                It's become my go-to tool for faster portfolio growth."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/imgs/for-investor.png" alt="Agent" />
              </div>
              <div className="author-info">
                <div className="author-name">Dana T.</div>
                <div className="author-role">Real Estate Investor</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-content">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="stars">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((s, i) => (
                      <span className="star" key={i}>
                        {s}
                      </span>
                    ))}
                </div>
                <div className="date">May 20, 2024</div>
              </div>
              <p className="testimonial-text">
                "
                <span>
                  Propscore has completely changed how I work with competitive
                  market
                </span>
                analysis and builds trust. Clients appreciate the transparency
                and I close deals faster."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/imgs/agents.png" alt="Agent" />
              </div>
              <div className="author-info">
                <div className="author-name">Jennifer R.</div>
                <div className="author-role">Real Estate Agent</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-content">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="stars">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((s, i) => (
                      <span className="star" key={i}>
                        {s}
                      </span>
                    ))}
                </div>
                <div className="date">May 20, 2024</div>
              </div>
              <p className="testimonial-text">
                <span>
                  We were overwhelmed trying to compare neighborhoods and
                  listings — Propscore made it simple.
                </span>
                We found a home that was not just beautiful but actually a smart
                investment that gave us peace of mind and confidence in our
                decision."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/imgs/agents.png" alt="Agent" />
              </div>
              <div className="author-info">
                <div className="author-name">Sarah S. James M.</div>
                <div className="author-role">First-time Buyer</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-content">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="stars">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((s, i) => (
                      <span className="star" key={i}>
                        {s}
                      </span>
                    ))}
                </div>
                <div className="date">May 20, 2024</div>
              </div>
              <p className="testimonial-text">
                "
                <span>
                  I screen dozens of properties a week — Propscore saves me
                  hours.
                </span>
                It instantly highlights high-potential red flags hidden risks.
                It's become my go-to tool for faster portfolio growth."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/imgs/for-investor.png" alt="Agent" />
              </div>
              <div className="author-info">
                <div className="author-name">Dana T.</div>
                <div className="author-role">Real Estate Investor</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="navigation-wrapper">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </section>
  );
}
