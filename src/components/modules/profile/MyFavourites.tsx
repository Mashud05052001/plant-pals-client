import { useGetFavouritePosts } from "@/src/hooks/post.fetch.hook";
import { TUser } from "@/src/types";
import ProfileFavouritesPostSkeleton from "../../shekeleton/ProfileFavouritesPostSkeleton";
import PostGallery from "../SignlePost/PostGallery";
import ProfilePostAction from "../SignlePost/ProfilePostAction";
import ProfilePostHeader from "../SignlePost/ProfilePostHeader";

type TProps = {
  postIds: string[];
  userId: string;
};

export default function MyFavourites({ postIds }: TProps) {
  // Call the hook unconditionally
  const { data: posts, isLoading, error } = useGetFavouritePosts(postIds);

  // Check if postIds is empty before rendering
  if (postIds.length === 0) {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-semibold ">
          You do not have any favourite posts yet.
        </h2>
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="px-4">
        <ProfileFavouritesPostSkeleton />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div>Error loading posts.</div>;
  }

  // Render posts if available
  return (
    <div className="mt-2">
      {posts?.data?.data && posts?.data.meta.totalData ? (
        <div className="grid grid-cols-2 gap-6">
          {posts.data.data.map((post) => (
            <div key={post?._id}>
              <div className="bg-white shadow-md rounded-lg dark:bg-gray-800 p-4 mb-6 max-w-xl mx-auto relative">
                {/* User Info */}
                <ProfilePostHeader
                  post={post}
                  type="myFavouritePosts"
                  createdUserData={
                    post.user as Pick<
                      TUser,
                      | "_id"
                      | "name"
                      | "email"
                      | "role"
                      | "profilePicture"
                      | "favouritePosts"
                    >
                  }
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
          <h2 className="text-2xl font-semibold">
            You do not have any favourite posts yet.
          </h2>
        </div>
      )}
    </div>
  );
}
