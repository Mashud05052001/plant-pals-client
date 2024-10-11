"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const PremiumLogo = () => {
  return (
    <Tooltip
      content="Premium Post"
      closeDelay={50}
      color="success"
      className="text-white"
    >
      <div className="ml-3">
        <MdOutlineWorkspacePremium className="size-6 text-common-600" />
      </div>
    </Tooltip>
  );
};

export default PremiumLogo;
