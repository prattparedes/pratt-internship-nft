import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({data, loading}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? <>{new Array(8).fill(0).map((_, index) => (
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
          ))}</>:
          
          data.nftCollection?.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={data.authorImage} alt="" />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
