import { TPost } from "@/src/types";
import FavouritePostHeader from "../SignlePost/FavouritePostHeader";
import PostGallery from "../SignlePost/PostGallery";
import ProfilePostAction from "../SignlePost/ProfilePostAction";
import nexiosInstance from "nexios-http";
import axiosInstance from "@/src/lib/axiosInstance";
import axios from "axios";

type TProps = {
  postIds: string[];
};

export default function MyFavourites({ postIds }: TProps) {
  //   const posts = await axiosInstance.get(
  //     `http://localhost:5000/api/v1/posts/multiple?postIds=${postIds}`
  //   );
  //   console.log(posts);
  return (
    <div className="mt-2">
      {postIds?.length > 0 ? (
        <div>mas</div>
      ) : (
        // <div className="grid grid-cols-2 gap-6">
        //   {posts.map((post) => (
        //     <div key={post?._id}>
        //       <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-xl mx-auto">
        //         {/* User Info */}
        //         <FavouritePostHeader
        //           createdUserId={post.user as string}
        //           title={post?.title}
        //           description={post?.description}
        //           createdAt={post?.createdAt}
        //         />
        //         {/* Post Images */}
        //         <PostGallery images={post.images} />
        //         {/* Post Actions */}
        //         <ProfilePostAction
        //           comments={post?.comments as string[]}
        //           downvote={post?.downvote}
        //           upvote={post?.upvote}
        //         />
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <div>
          <h2 className="text-2xl font-semibold">
            You hane not any favourite posts exist
          </h2>
        </div>
      )}
    </div>
  );
}
