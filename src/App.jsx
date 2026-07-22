import TasksPage from "./features/pages/TasksPage";
import NavBar from "./shared/components/NavBar/NavBar";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar activePage="tasks" />
      <div className="flex-1 min-w-0 overflow-y-auto">
        <TasksPage />
      </div>
    </div>
  );
}

export default App;
