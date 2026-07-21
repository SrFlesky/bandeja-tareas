import TasksPage from "./features/pages/TasksPage";
import NavBar from "./shared/components/NavBar/NavBar";

function App() {
  return (
    <div className="flex">
      <NavBar />
      <div className="flex-1 min-w-0 bg-page-bg">
        <TasksPage />
      </div>
    </div>
  );
}

export default App;
