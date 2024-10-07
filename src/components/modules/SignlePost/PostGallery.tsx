import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import Link from "next/link";

export default function PostGallery({ images }: { images: string[] }) {
  return (
    <div>
      <LightGallery
        mode="lg-fade"
        elementClassNames={`mt-2 gap-2 grid place-items-center
            ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} `}
        speed={300}
        plugins={[lgZoom]}
      >
        {images?.map((image, idx) => (
          <Link
            href={image}
            key={idx + 1}
            className={`${
              images.length === 3 && idx === 0 ? "col-span-2" : "col-span-1"
            } w-full`}
          >
            <Image
              className=" w-full h-[300px] object-cover object-center"
              src={image}
              height={500}
              width={500}
              alt={`image-${idx}`}
            />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
}
