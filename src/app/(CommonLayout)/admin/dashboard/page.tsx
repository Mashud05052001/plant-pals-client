"use server";
import DashboardSelectYear from "@/src/components/modules/adminDashboard/chart/DashboardSelectYear";
import DashboardPaymentChart from "@/src/components/modules/adminDashboard/chart/PaymentChart";
import DashboardPostUserChart from "@/src/components/modules/adminDashboard/chart/PostUserChart";
import { getAdminDashboard } from "@/src/services/user.fetch.service";
import moment from "moment";

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) => {
  const year = searchParams?.year ? Number(searchParams.year) : moment().year();
  const dashboardRecord = await getAdminDashboard(year);

  return (
    <div>
      <div className="space-y-8 mt-6">
        <div>
          <DashboardSelectYear year={year} />
        </div>
        <div>
          <h1 className="pl-8 font-semibold mb-2">
            Registered User & Create Post Info
          </h1>
          <DashboardPostUserChart records={dashboardRecord} />
        </div>
        <div>
          <h1 className="pl-8 font-semibold mb-2">Payment Info</h1>
          <DashboardPaymentChart records={dashboardRecord} />
        </div>
      </div>
    </div>
  );
};

export default Page;
