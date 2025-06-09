import { getAllLabs } from "~/server/services/labsService";
import DashboardInfo from "./dashboard/DashboardInfo";

export default async function Dashboard() {
  const labs = await getAllLabs();
  return <DashboardInfo labs={labs} />;
}
