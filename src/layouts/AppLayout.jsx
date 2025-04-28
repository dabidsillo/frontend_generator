import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout() {
  const { user, error } = useAuth({ middleware: "auth" });

  return (
    <div>
      <Navigation />
    </div>
  );
}
