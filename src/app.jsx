import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Nav from "./components/Nav"; // Assuming Nav.jsx is in the same directory

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>daisyui202507050418dsolidstart</Title>
          <Suspense>
            <div class="flex flex-col min-h-screen">
              {/* 手機版：Nav 在上方 */}
              <nav class="bg-gray-100 p-4">
                <Nav />
              </nav>

              {/* 內容區 */}
              <main class="flex-1 p-4">{props.children}</main>
            </div>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
