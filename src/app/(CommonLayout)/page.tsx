import InfiniteNewsFeed from "@/src/components/modules/newsFeed/InfiniteNewsFeed";
import NewsFeedFilter from "@/src/components/modules/newsFeed/NewsFeedFilter";
import { useGetCategoriesServerSide } from "@/src/hooks/category.serverFetch.hook";
import { getNewsFeed } from "@/src/services/post.fetch.service";
import { getMyInfos } from "@/src/services/user.fetch.service";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const posts = await getNewsFeed(
    1,
    3,
    searchParams?.searchTerm,
    searchParams?.category
  );
  const loginUserData = await getMyInfos();
  const categories = await useGetCategoriesServerSide();

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <NewsFeedFilter allCategories={categories} />
        </div>
        {posts?.data?.length !== 0 ? (
          <InfiniteNewsFeed
            posts={posts}
            loginUserData={loginUserData}
            searchParams={searchParams}
          />
        ) : (
          <h1 className="text-center mt-12 text-2xl font-semibold text-red-600">
            -No post available-
          </h1>
        )}
      </div>
    </div>
  );
}
