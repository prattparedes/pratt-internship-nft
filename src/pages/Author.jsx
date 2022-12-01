import React, { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [activefollow, setActivefollow] = useState(true);

  async function getUserData(id) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    getUserData(id);
  }, []);

  function newFollower(event) {
    event.preventDefault();
    data.followers = data.followers + 1;
    setActivefollow(false);
  }

  function unfollow(event) {
    event.preventDefault();
    data.followers = data.followers - 1;
    setActivefollow(true);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"50%"}
                        />
                      ) : (
                        <img src={data.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loading ? (
                          <h4>
                            <Skeleton
                              width={"200px"}
                              height={"24px"}
                              borderRadius={"0"}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width={"100px"}
                                height={"16px"}
                                borderRadius={"0"}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width={"250px"}
                                height={"16px"}
                                borderRadius={"0"}
                              />
                            </span>
                          </h4>
                        ) : (
                          <>
                            <h4>
                              {data.authorName}
                              <span className="profile_username">
                                @{data.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {data.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div className="profile_follower">
                          <Skeleton
                            width={"150px"}
                            height={"40px"}
                            borderRadius={"0"}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {data.followers} followers
                          </div>
                          {activefollow ? (
                            <Link
                              to=""
                              className="btn-main"
                              onClick={(event) => newFollower(event)}
                            >
                              Follow
                            </Link>
                          ) : (
                            <Link
                              to=""
                              className="btn-main"
                              onClick={(event) => unfollow(event)}
                            >
                              Unfollow
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems data={data} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
