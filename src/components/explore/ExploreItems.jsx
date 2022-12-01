import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  const [slices, setSlices] = useState(8);

  async function getData(filter) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}` : ''}`
    );
    setItems(data);
    setLoading(false);
  }

  function showMore() {
    setSlices(slices + 4)
  }

  function handleFilter(filter) {
    getData(filter)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={e => {handleFilter(e.target.value)}}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading ? (
        items.map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <Countdown date={item.expiryDate} />}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        )).slice(0,slices)
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <Skeleton
                      width={"50px"}
                      height={"50px"}
                      borderRadius={"50%"}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <Skeleton
                      width={"100%"}
                      height={"350px"}
                      borderRadius={"0"}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <Skeleton
                      width={"180px"}
                      height={"30px"}
                      borderRadius={"0"}
                    />
                  </Link>
                  <div className="nft__item_price">
                    <Skeleton
                      width={"100px"}
                      height={"20px"}
                      borderRadius={"0"}
                    />
                  </div>
                  <div className="nft__item_like">
                    <span>
                      <Skeleton
                        width={"30px"}
                        height={"15px"}
                        borderRadius={"0"}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {slices !== 16 && <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={showMore}>
          Load more
        </Link>
      </div>}
    </>
  );
};

export default ExploreItems;
