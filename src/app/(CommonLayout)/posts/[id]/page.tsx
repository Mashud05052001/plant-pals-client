"use server";
import PostGallery from "@/src/components/modules/SignlePost/PostGallery";
import SinglePostAction from "@/src/components/modules/SignlePost/SinglePostAction";
import SinglePostComments from "@/src/components/modules/SignlePost/SinglePostComments";
import SinglePostHeader from "@/src/components/modules/SignlePost/SinglePostHeader";
import { getSinglePost } from "@/src/services/post.fetch.service";
import { getMyInfos } from "@/src/services/user.fetch.service";

type TProps = {
  params: { id: string };
};
export default async function Page({ params }: TProps) {
  const post = await getSinglePost(params?.id);
  const loginUserData = await getMyInfos();
  return (
    <div>
      <div className="bg-white relative shadow-md rounded-lg p-4 mb-6 mx-auto max-w-2xl">
        <SinglePostHeader post={post} loginUserData={loginUserData} />
        <PostGallery images={post?.images} />
        <SinglePostAction post={post} loginUserData={loginUserData} />
        <SinglePostComments postId={post?._id} />
      </div>
    </div>
  );
}
