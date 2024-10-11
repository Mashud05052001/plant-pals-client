"use client";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  imgUrl: string;
  idx: number;
};

export default function SinglePhotoShow({ idx, imgUrl }: TProps) {
  return (
    <LightGallery mode="lg-fade" speed={300} plugins={[lgZoom]}>
      <Link href={imgUrl} key={idx + 1}>
        <Image
          src={imgUrl}
          alt={`Image`}
          width={500}
          height={500}
          className="rounded-md hover:scale-[1.02] duration-200 hover:shadow-lg hover:shadow-gray-400 dark:shadow-gray-700"
        />
      </Link>
    </LightGallery>
  );
}
