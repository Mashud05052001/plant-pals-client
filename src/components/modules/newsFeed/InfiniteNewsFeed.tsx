"use client";
import { useUserProvider } from "@/src/context/user.provider";
import { getNewsFeed } from "@/src/services/post.fetch.service";
import { TMeta, TPlaneUser, TPost } from "@/src/types";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import NewsFeedAction from "../SignlePost/NewsFeedAction";
import NewsFeedHeader from "../SignlePost/NewsFeedHeader";
import PostGallery from "../SignlePost/PostGallery";

type TProps = {
  posts: {
    data: TPost[];
    meta: TMeta;
  };
  loginUserData: TPlaneUser | null;
  searchParams: Record<string, string>;
  isPremiumContent?: boolean;
};

export default function InfiniteNewsFeed({
  posts,
  loginUserData,
  searchParams,
  isPremiumContent = false,
}: TProps) {
  const [totalPostsCount, setTotalPostsCount] = useState(
    posts?.meta?.totalData
  );
  const [allStaticPosts, setAllStaticPosts] = useState(posts?.data);
  const { ref: loadingRef, inView: loadingInView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUserProvider();
  const loginUserEmail = user?.email || null;
  useEffect(() => {
    const filterPosts = async () => {
      const searchTerm = searchParams?.searchTerm || "";
      const category = searchParams?.category || "";
      const newPosts = await getNewsFeed(
        1,
        5,
        searchTerm,
        category,
        isPremiumContent
      );
      setAllStaticPosts(newPosts.data);
      setTotalPostsCount(newPosts.meta.totalData);
      setCurrentPage(1);
    };
    filterPosts();
  }, [searchParams, isPremiumContent]);

  const loadMorePosts = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const nextPage = currentPage + 1;
    const newPostData = await getNewsFeed(
      nextPage,
      5,
      searchParams?.searchTerm,
      searchParams?.category,
      isPremiumContent
    );
    const newPosts = newPostData.data;
    setAllStaticPosts((prev) => [...prev, ...newPosts]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (loadingInView) {
      loadMorePosts();
    }
  }, [loadingInView]);

  return (
    <div>
      <div>
        {allStaticPosts?.map((post, idx) => (
          <div key={`${post?._id}-${idx}`}>
            <div key={post?._id}>
              <div className="relative shadow-md rounded-lg p-4 mb-6 mx-auto bg-white dark:bg-gray-800 dark:shadow-lg">
                {/* User Info */}
                <NewsFeedHeader
                  post={post}
                  loginUserData={loginUserData}
                  setAllStaticPosts={setAllStaticPosts}
                  currentLoginUserEmail={loginUserEmail}
                  setTotalPostsCount={setTotalPostsCount}
                />
                {/* Post Images */}
                <PostGallery images={post.images} />
                {/* Post Actions */}
                <NewsFeedAction
                  post={post}
                  loginUserData={loginUserData}
                  setAllStaticPosts={setAllStaticPosts}
                  currentLoginUserEmail={loginUserEmail}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {allStaticPosts.length < totalPostsCount ? (
        <div className="flex justify-center pt-8 mb-8" ref={loadingRef}>
          <Spinner color="success" />
        </div>
      ) : (
        <p className="text-center pt-8 mb-8 dark:text-white">
          All posts loaded successfully
        </p>
      )}
    </div>
  );
}

/*
"use client";
import { useUserProvider } from "@/src/context/user.provider";
import { getNewsFeed } from "@/src/services/post.fetch.service";
import { TMeta, TPlaneUser, TPost } from "@/src/types";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import NewsFeedAction from "../SignlePost/NewsFeedAction";
import NewsFeedHeader from "../SignlePost/NewsFeedHeader";
import PostGallery from "../SignlePost/PostGallery";

type TProps = {
  posts: {
    data: TPost[];
    meta: TMeta;
  };
  loginUserData: TPlaneUser | null;
  searchParams: Record<string, string>;
};

export default function InfiniteNewsFeed({ posts, loginUserData }: TProps) {

  const [totalPostsCount, setTotalPostsCount] = useState(
    posts?.meta?.totalData
  );
  const [allStaticPosts, setAllStaticPosts] = useState(posts?.data);
  const { ref: loadingRef, inView: loadingInView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUserProvider();
  const [loginUserEmail, setLoaginUserEmail] = useState<string | null>(
    user?.email || null
  );

  const loadMorePosts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const nextPage = currentPage + 1;
    const newPostData = await getNewsFeed(nextPage);
    const newPosts = newPostData.data;
    setAllStaticPosts((prev) => [...prev, ...newPosts]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (loadingInView) {
      console.log("loading is viewing");
      loadMorePosts();
    }
  }, [loadingInView]);

  return (
    <div>
      <div>
        {allStaticPosts?.map((post, idx) => (
          <div key={`${post?._id}-${idx}`}>
            <div key={post?._id}>
              <div className="bg-white  relative shadow-md rounded-lg p-4 mb-6 mx-auto">

                <NewsFeedHeader
                  post={post}
                  loginUserData={loginUserData}
                  setAllStaticPosts={setAllStaticPosts}
                  currentLoginUserEmail={loginUserEmail}
                  setTotalPostsCount={setTotalPostsCount}
                />

                <PostGallery images={post.images} />

                <NewsFeedAction
                  post={post}
                  loginUserData={loginUserData}
                  setAllStaticPosts={setAllStaticPosts}
                  currentLoginUserEmail={loginUserEmail}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {allStaticPosts.length < totalPostsCount ? (
        <div className="flex justify-center pt-8 mb-8" ref={loadingRef}>
          <Spinner color="success" />
        </div>
      ) : (
        <p className="text-center pt-8 mb-8">All posts loaded successfully</p>
      )}
    </div>
  );
}

*/
