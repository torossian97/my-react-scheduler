import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NylasSchedulerEditor, NylasScheduling } from "@nylas/react";
import "./App.css";

function App() {
  // Get the configuration ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const configId = urlParams.get("config_id") || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <a href="/scheduler-editor" className="button">View Scheduler Editor</a>
            <NylasScheduling
              configurationId={configId}
              schedulerApiUrl="https://api-staging.us.nylas.com"
            />
          </div>
        } />
        <Route path="/scheduler-editor" element={
          <div>
            <NylasSchedulerEditor
              schedulerPreviewLink={`${window.location.origin}/?config_id={config.id}`}
              nylasSessionsConfig={{
                clientId: "364f30e8-df03-4555-9730-ce79f7e467b2", // Replace with your Nylas client ID from the previous
                redirectUri: `${window.location.origin}/scheduler-editor`,
                domain: "https://api-staging.us.nylas.com/v3", // or 'https://api.eu.nylas.com/v3' for EU data center
                hosted: true,
                accessType: 'offline',
              }}
            />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;   