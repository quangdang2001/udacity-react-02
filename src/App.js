import "./App.css";
import { PageTemplate } from "./Layout";
import { AuthProvider } from "./Provider";
import { routes } from "./Utils/routeUtil";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <PageTemplate>
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
          </Routes>
        </PageTemplate>
      </div>
    </AuthProvider>
  );
}

export default App;
