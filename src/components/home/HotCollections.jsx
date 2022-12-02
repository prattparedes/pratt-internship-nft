import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const HotCollections = () => {
  AOS.init()
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState();

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(false)
  }

  useEffect(() => {
    getData();
  }, []);

  const options = {
    className: "owl-theme",
    loop: true,
    margin: 10,
    nav: true,
    dotsContainer: "false",
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container" data-aos="fade-up" data-aos-delay="60" data-aos-duration="600" data-aos-offset="0" data-aos-easing="ease-in-sine">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel {...options}>
              {collections.map((_) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 col-new"
                  key={_.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${_.nftId}`}>
                        <img
                          src={_.nftImage}
                          className="lazy img-fluid img-fit"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${_.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={_.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{_.title}</h4>
                      </Link>
                      <span>ERC-{_.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
            {new Array(6).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 col-new"
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <Skeleton
                        width={"100%"}
                        height={"200px"}
                        borderRadius={"0"}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <Skeleton
                        width={"50px"}
                        height={"50px"}
                        borderRadius={"50%"}
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <Skeleton
                        width={"100px"}
                        height={"20px"}
                        borderRadius={"0"}
                      />
                    </Link>
                    <br />
                    <span>
                      <Skeleton
                        width={"60px"}
                        height={"20px"}
                        borderRadius={"0"}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
