import { InboxIcon, MapPinIcon, PhoneIcon } from "lucide-react";

export const contactUsArray = [
  {
    id: 1,
    icon: () => <PhoneIcon className="size-6" />,
    title: "Phone",
    value: "+8801712345678",
  },
  {
    id: 2,
    icon: () => <InboxIcon className="size-6" />,
    title: "Email",
    value: "plantpals@official.com",
  },
  {
    id: 3,
    icon: () => <MapPinIcon className="size-6" />,
    title: "Address",
    value: "Sylhet, Bangladesh",
  },
];
