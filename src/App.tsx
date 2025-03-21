import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import EventsPage from "./components/events/EventsPage";
import NotificationsPage from "./components/notifications/NotificationsPage";
import ChaptersPage from "./components/chapters/ChaptersPage";
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import SettingsPage from "./components/settings/SettingsPage";

function App() {
  // this is krishna
  return (
    // this is krishna

    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
