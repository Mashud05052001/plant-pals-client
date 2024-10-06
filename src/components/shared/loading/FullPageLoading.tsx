import { TChildrenProps } from "@/src/types";
import { Spinner } from "@nextui-org/spinner";

const FullPageGlassLoading = ({ children, className }: TChildrenProps) => {
  return (
    <div
      className={`bg-black/10 w-screen h-screen fixed inset-0 z-[99] backdrop-blur-md  flex justify-center items-center duration-100 ${className}`}
    >
      <div>
        <div>{children}</div>
        <Spinner size="lg" />
      </div>
    </div>
  );
};

export default FullPageGlassLoading;
