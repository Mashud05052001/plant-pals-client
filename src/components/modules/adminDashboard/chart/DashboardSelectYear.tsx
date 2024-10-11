"use client";

import { Select, SelectItem } from "@nextui-org/select";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardSelectYear = ({ year }: { year: number }) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const yearList = Array.from({ length: 5 }, (_, index) =>
    moment().subtract(index, "years").year()
  );
  const yearOptions = yearList.map((year) => ({
    key: year,
    label: year.toString(),
  }));
  const router = useRouter();

  useEffect(() => {
    if (selectedYear) {
      const params = new URLSearchParams(window.location.search);
      params.set("year", selectedYear.toString());
      router.push(`?${params.toString()}`);
    }
  }, [selectedYear, router]);
  return (
    <div className="flex items-center ml-6 space-x-3">
      <h4 className="font-semibold">Select a year to view records:</h4>
      <Select
        label={`Selected A Year`}
        variant="bordered"
        placeholder="Select a year"
        value={selectedYear.toString()}
        className="max-w-60 text-black"
        onChange={(e) => {
          setSelectedYear(Number(e.target.value));
        }}
      >
        {yearOptions.map((year) => (
          <SelectItem key={year.key}>{year.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default DashboardSelectYear;
