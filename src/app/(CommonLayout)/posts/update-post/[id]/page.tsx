import UpdatePost from "@/src/components/modules/post/UpdatePost";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TCategory, TPost, TSuccess } from "@/src/types";

type TProps = {
  params: { id: string };
};

export default async function Page({ params: { id: postId } }: TProps) {
  const { data: singlePostRes } = await nexiosInstance.get(`/posts/${postId}`, {
    cache: "no-store",
  });
  const { data: categoryRes } = await nexiosInstance.get("/category", {
    cache: "no-store",
  });
  const previousPostData = (singlePostRes as TSuccess<TPost>).data;
  const allCategories = (categoryRes as TSuccess<TCategory[]>).data;

  return (
    <div>
      {previousPostData && allCategories && (
        <UpdatePost
          categories={allCategories}
          prevPostData={previousPostData}
        />
      )}
    </div>
  );
}
