import ManagePayments from "@/src/components/modules/adminDashboard/ManagePayments";
import { getAllPaymentsInfo } from "@/src/services/user.fetch.service";

const Page = async () => {
  const allPayments = await getAllPaymentsInfo();

  return (
    <div>
      {allPayments && allPayments?.length === 0 ? (
        <div className="mt-20 flex flex-col justify-center items-center space-y-2 text-xl font-semibold pb-6">
          <p>NO posts exist</p>
        </div>
      ) : (
        <ManagePayments allPayments={allPayments} />
      )}
    </div>
  );
};

export default Page;
