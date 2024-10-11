import ProfileHeader from "@/src/components/modules/profile/ProfileHeader";
import PostGallery from "@/src/components/modules/SignlePost/PostGallery";
import ProfilePostHeader from "@/src/components/modules/SignlePost/ProfilePostHeader";
import SinglePostAction from "@/src/components/modules/SignlePost/SinglePostAction";
import { getMyInfos, getSingleUser } from "@/src/services/user.fetch.service";
import { TPost } from "@/src/types";

type TProps = {
  params: { id: string };
};
export default async function Page({ params }: TProps) {
  const userData = await getSingleUser(params?.id);
  const loginUserData = await getMyInfos();
  const posts = userData?.myPosts as TPost[];

  return (
    <div>
      <ProfileHeader
        userData={userData}
        isMyInformation={false}
        loginUserData={loginUserData}
      />
      <div className="mt-6">
        {posts?.length > 0 ? (
          <div className="grid mt-2 grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post?._id}>
                <div className="bg-white dark:bg-gray-800  relative shadow-md rounded-lg p-4 mb-6 max-w-xl mx-auto">
                  {/* User Info */}
                  <ProfilePostHeader
                    post={post}
                    type={"otherPosts"}
                    loginUserData={loginUserData}
                    userId={userData?._id}
                  />
                  {/* Post Images */}
                  <PostGallery images={post.images} />
                  {/* Post Actions */}

                  <SinglePostAction
                    post={post}
                    loginUserData={loginUserData}
                    showCommentsModal={true}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mt-4">
              This user does not create any post yet
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
