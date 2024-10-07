import moment from "moment";

type TProps = {
  title: string;
  createdAt: Date;
  description: string;
  createdUserId: string;
};

export default function FavouritePostHeader({
  title,
  description,
  createdAt,
}: TProps) {
  return (
    <div>
      <h2 className="font-semibold text-lg text-gray-800 ">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">
        Date: {moment(createdAt).format(`DD-MM-YYYY`)}
      </p>

      {/* Post Description */}
      <p className="text-gray-700 mb-4">{description}</p>
    </div>
  );
}
