"use client";
import noProfileImage from "@/src/assets/no-profile.jpg";
import { useUpdateProfilePicture } from "@/src/hooks/user.mutate.hook";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { toast } from "sonner";
import PPButton from "../../UI/button/PPButton";
import ModalContainer from "../ModalContainer";

type TProps = {
  children: ReactNode;
  userID: string;
  currentImage: string;
};

const EditProfilePictureModel = ({
  children,
  userID,
  currentImage,
}: TProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    mutate: handleProfilePicture,
    isLoading,
    isSuccess,
  } = useUpdateProfilePicture();
  const prevImage = currentImage || noProfileImage;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    if (!selectedImage) {
      toast.message("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    handleProfilePicture(formData);
  };
  useEffect(() => {
    if (isSuccess) setOpenModal(false);
  }, [isSuccess]);
  useEffect(() => {
    if (openModal === false) {
      setImagePreview(null);
      setSelectedImage(null);
    }
  }, [openModal]);
  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={children}
        title={"Update Profile Picture"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="flex justify-center items-center space-x-8">
            {/* Display current image or selected image */}
            <div className="relative w-44 h-44 rounded-full border-common-600 border-[3px]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="cover"
                  className="object-cover object-center rounded-full p-1 w-full h-full"
                />
              ) : (
                <Image
                  src={prevImage}
                  fill
                  className="object-cover object-center rounded-full p-1 "
                  alt={`${userID} cover picture`}
                />
              )}
            </div>

            {/* Image Upload Button */}
            <div>
              <label htmlFor="profileImage" className="cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-common-600 text-gray-200 hover:text-white cursor-pointer duration-150">
                  <RiImageAddFill className="size-8" />
                </div>
              </label>
              <input
                id="profileImage"
                type="file"
                accept=".png, .jpeg, .jpg, image/png, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          {/* Update Button */}
          <PPButton
            buttonText="Update Profile Picture"
            className="px-4 py-2  text-white rounded-md"
            onClick={handleSubmit}
            isDisabled={!imagePreview}
            isLoading={isLoading}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default EditProfilePictureModel;
