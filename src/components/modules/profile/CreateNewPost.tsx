"use client";
import { useCategories } from "@/src/hooks/category.hook";
import axiosInstance from "@/src/lib/axiosInstance";
import axios from "axios";
import { useEffect } from "react";

const CreateNewPost = () => {
  const { data, error, isLoading, revalidate } = useCategories();
  console.log(isLoading);
  // console.log(res.data);
  //   const res = await axios.get("http://localhost:5000/api/v1/category");
  //   console.log(res.data);
  return (
    <div>
      <h1 className="text-2xl"> This is CreateNewPost </h1>
    </div>
  );
};

export default CreateNewPost;
