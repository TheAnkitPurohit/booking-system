import { Suspense } from "react";
import StatsContainer from "@/components/admin/StatsContainer";
import ChartsContainer from "@/components/admin/ChartsContainer";
import {
  StatsLoadingContainer,
  ChartsLoadingContainer,
} from "@/components/admin/Loading";

function AdminPage() {
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  );
}
export default AdminPage;
