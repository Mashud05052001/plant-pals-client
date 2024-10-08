"use client";
import { TCategory, TPost } from "@/src/types";
import PostGallery from "../SignlePost/PostGallery";
import ProfilePostAction from "../SignlePost/ProfilePostAction";
import ProfilePostHeader from "../SignlePost/ProfilePostHeader";

type TProps = {
  posts: TPost[];
};

const MyPosts = ({ posts }: TProps) => {
  return (
    <div>
      {posts?.length > 0 ? (
        <div className="grid mt-2 grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post?._id}>
              <div className="bg-white  relative shadow-md rounded-lg p-4 mb-6 max-w-xl mx-auto">
                {/* User Info */}
                <ProfilePostHeader
                  type={"myPosts"}
                  postId={post?._id}
                  title={post?.title}
                  description={post?.description}
                  createdAt={post?.createdAt}
                  category={(post?.category as TCategory).name}
                />
                {/* Post Images */}
                <PostGallery images={post.images} />
                {/* Post Actions */}

                <ProfilePostAction
                  postId={post?._id}
                  comments={post?.comments as string[]}
                  downvote={post?.downvote}
                  upvote={post?.upvote}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mt-4">
            You have not create any posts.
          </h2>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
