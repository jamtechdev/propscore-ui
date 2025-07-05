import { Outlet } from "react-router";
import Header_V2 from "../Component/header/header-v2/header";
import Footer from "../Component/Footer/footer";

export default function Layout() {
  return (
    <div>
      <Header_V2 />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
