import AdminNavbar from "./components/AdminNavbar";
import TimeTable from "./components/TimeTable/page";

export default  async function HomePage() {

return  (
    <div className="main-layout">

      <AdminNavbar />

      {/* <Sidebar  /> */}

      <main className={"main-content"}>
      <TimeTable />
      </main>

    </div>
  );
}