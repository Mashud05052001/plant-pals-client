import ManagePosts from "@/src/components/modules/adminDashboard/ManagePosts";
import { getNewsFeed } from "@/src/services/post.fetch.service";

const Page = async () => {
  const allPosts = await getNewsFeed(1, 10000);

  return (
    <div>
      {allPosts && allPosts?.meta?.totalData === 0 ? (
        <div className="mt-20 flex flex-col justify-center items-center space-y-2 text-xl font-semibold pb-6">
          <p>NO posts exist</p>
        </div>
      ) : (
        <ManagePosts allPosts={allPosts?.data} />
      )}
    </div>
  );
};

export default Page;
