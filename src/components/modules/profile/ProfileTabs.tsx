"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import MyPosts from "./MyPosts";
import MyFavourites from "./MyFavourites";
import { TPost, TUser } from "@/src/types";
import { Suspense } from "react";
import CreateNewPost from "./CreateNewPost";

type TProps = {
  userData: TUser;
};

export default function ProfileTabs({ userData }: TProps) {
  return (
    <div>
      <Tabs aria-label="Options">
        <Tab key="posts" title={<p className="px-8 font-medium">My Posts</p>}>
          <MyPosts posts={userData?.myPosts as TPost[]} />
        </Tab>
        <Tab
          key="favourites"
          title={<p className="px-8 font-medium">Favourites</p>}
        >
          <Suspense fallback={<p>Loading...</p>}>
            <MyFavourites postIds={userData?.favouritePosts as string[]} />
          </Suspense>
        </Tab>
        <Tab
          key="new post"
          title={<p className="px-8 font-medium">Create New Post</p>}
        >
          <CreateNewPost />
        </Tab>
      </Tabs>
    </div>
  );
}
