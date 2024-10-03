import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import CommonContainer from "../components/UI/container/CommonContainer";
import MotionOpacityContainer from "../components/UI/container/MotionOpacityContainer";

export default function NotFound() {
  return (
    <CommonContainer className="min-h-screen flex justify-center items-center">
      <MotionOpacityContainer>
        <div>
          <div className="flex flex-col items-center justify-center  bg-gradient-to-r ">
            <div className="">
              <FaExclamationTriangle
                size={70}
                className="text-8xl mb-4 drop-shadow-lg text-red-600"
              />
            </div>
            <div className="flex">
              <h1 className="text-xl font-semibold mb-2 pr-2">404 | </h1>
              <p className="text-xl font-medium mb-6 drop-shadow-lg">
                Page Not Found
              </p>
            </div>
            <div className="text-center space-x-6 text-lg">
              <Link
                href="/"
                className="hover:underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Go to News Feed
              </Link>
              <Link
                href="/login"
                className="hover:underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </MotionOpacityContainer>
    </CommonContainer>
  );
}
