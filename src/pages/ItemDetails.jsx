import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function getItemData(id) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    getItemData(id);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width={"100%"} height={"100%"} />
                ) : (
                  <img
                    src={data.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? (
                      <Skeleton width={"300px"} height={"40px"} />
                    ) : (
                      data.title + " #" + data.tag
                    )}
                  </h2>

                  <div className="item_info_counts">
                    {loading ? (
                      <>
                        {" "}
                        <Skeleton width={"80px"} height={"30px"} />
                        <Skeleton width={"80px"} height={"30px"} />
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {data.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {data.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {loading ? (
                    <Skeleton width={"100%"} height={"80px"} />
                  ) : (
                    <p>{data.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${data.ownerId}`}>
                            {loading ? (
                              <Skeleton
                                width={"50px"}
                                height={"50px"}
                                borderRadius={"50%"}
                              />
                            ) : (
                              <>
                                <img
                                  className="lazy"
                                  src={data.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${data.ownerId}`}>
                            {loading ? (
                              <Skeleton width={"125px"} height={"20px"} />
                            ) : (
                              data.ownerName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${data.creatorId}`}>
                            {loading ? (
                              <Skeleton
                                width={"50px"}
                                height={"50px"}
                                borderRadius={"50%"}
                              />
                            ) : (
                              <>
                                <img
                                  className="lazy"
                                  src={data.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${data.creatorId}`}>
                            {loading ? (
                              <Skeleton width={"125px"} height={"20px"} />
                            ) : (
                              data.creatorName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={"75px"} height={"20px"} />
                      ) : (
                        <>
                          {" "}
                          <img src={EthImage} alt="" />
                          <span>{data.price}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
