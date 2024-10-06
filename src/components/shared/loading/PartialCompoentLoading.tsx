import { TChildrenProps } from "@/src/types";
import { Spinner } from "@nextui-org/spinner";
// import { PuffLoader } from "react-spinners";

const PartialComponentGlassLoading = ({
  children,
  className,
}: TChildrenProps) => {
  return (
    <div
      className={`bg-black/10 absolute  inset-0 z-[99] backdrop-blur-md  flex justify-center items-center duration-100 ${className}`}
    >
      <div className="flex flex-col items-center bg-black/20 text-white px-10 py-6 rounded-lg text-xl font-medium space-y-2">
        <div>{children}</div>
        <Spinner size="lg" />
      </div>
    </div>
  );
};

export default PartialComponentGlassLoading;
