import TopBar from "./shared/components/TopBar/TopBar";
import NavBar from "./shared/components/NavBar/NavBar";
import TasksPage from "./features/pages/TasksPage";
import BottomNav from "./shared/components/BottomNav/BottomNav";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar activePage="tasks" />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex-1 min-w-0 overflow-y-auto bg-page-bg">
          <TasksPage />
        </div>
        <BottomNav activePage="tasks" />
      </div>
    </div>
  );
}

export default App;
