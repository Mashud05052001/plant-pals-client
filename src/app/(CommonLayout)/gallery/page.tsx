"use server";

import SinglePhotoShow from "@/src/components/modules/gallery/SinglePhotoShow";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TGallery, TSuccessWithMeta } from "@/src/types";
import { TbFaceIdError } from "react-icons/tb";
import modules from "./gallery.module.css";

export default async function Page() {
  const response = await nexiosInstance.get("/posts?fields=gallery_images", {
    next: {
      tags: ["galleryPhotos"],
      revalidate: 30,
    },
  });
  const data = (response.data as TSuccessWithMeta<TGallery[]>).data;
  const allPhotos = data.data.map((item) => item.images).flat();

  return (
    <div>
      {data?.data.length > 0 ? (
        <div className={`${modules.gallery}`}>
          {/* <div className="gallery"> */}
          {allPhotos.map((img, idx) => (
            // <div className="pcis p-2.5" key={idx}>
            <div className={`${modules.pics} p-2.5`} key={idx}>
              <SinglePhotoShow idx={idx} imgUrl={img} />
              <>
                {/* <SinglePhotoModal imgUrl={img} idx={idx}>
                <Image
                src={img}
                alt={`Image-${idx}`}
                width={500}
                height={500}
                className="rounded-md hover:scale-[1.02] duration-200 hover:shadow-lg hover:shadow-gray-400"
                />
                </SinglePhotoModal> */}
              </>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 space-y-2 text-red-600">
          <TbFaceIdError className="size-20" />
          <h1 className="text-3xl font-bold flex items-center">
            No Images Found
          </h1>
        </div>
      )}
    </div>
  );
}
