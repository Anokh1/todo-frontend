import { useContext } from "react";
import { DOCUMENT_TITLE } from "utilities/Constant/documentTitle.constant";
import { useLoading } from "utilities/Context/LoadingContext";
import { UserContext } from "utilities/Context/UserContext";

const Dashboard = () => {
  document.title = DOCUMENT_TITLE.Dashboard;
  const { startLoading, stopLoading } = useLoading();
  const { user } = useContext(UserContext);
};
