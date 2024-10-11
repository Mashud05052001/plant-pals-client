"use client";
import { TPost, TUser } from "@/src/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useState } from "react";
import CreateNewPost from "./CreateNewPost";
import MyFavourites from "./MyFavourites";
import MyPosts from "./MyPosts";

type TProps = {
  userData: TUser;
};

export default function ProfileTabs({ userData }: TProps) {
  const [activeTab, setActiveTab] = useState("posts");
  const handleTabChange = (tabKey: "posts" | "favourites" | "create_post") => {
    setActiveTab(tabKey);
  };
  return (
    <div>
      <Tabs
        aria-label="Options"
        defaultSelectedKey={activeTab}
        selectedKey={activeTab}
        onSelectionChange={(key) =>
          handleTabChange(key as "posts" | "favourites" | "create_post")
        }
      >
        <Tab key="posts" title={<p className="px-8 font-medium">My Posts</p>}>
          <MyPosts posts={userData?.myPosts as TPost[]} />
        </Tab>
        <Tab
          key="favourites"
          title={<p className="px-8 font-medium">Favourites</p>}
        >
          <MyFavourites
            postIds={userData?.favouritePosts as string[]}
            userId={userData?._id}
          />
        </Tab>
        <Tab
          key="create_post"
          title={<p className="px-8 font-medium">Create New Post</p>}
        >
          <CreateNewPost
            handleTabChange={handleTabChange}
            isUserVerified={userData?.isVerified || false}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
