import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NylasSchedulerEditor, NylasScheduling } from "@nylas/react";
import "./App.css";

function App() {
  // Get the configuration ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const Id = urlParams.get("config_id") || urlParams.get("booking_id") || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <a href="/scheduler-editor" className="button">View Scheduler Editor</a>
            <NylasScheduling
              configurationId={Id}
              schedulerApiUrl="https://api.us.nylas.com"
            />
          </div>
        } />
        <Route path="/reschedule" element={
          <div>
            <NylasScheduling
              rescheduleBookingId={Id}
              schedulerApiUrl="https://api.us.nylas.com"
            />
          </div>
        } />
        <Route path="/cancel" element={
          <div>
            <NylasScheduling
              cancelBookingId={Id}
              schedulerApiUrl="https://api.us.nylas.com"
            />
          </div>
        } />
        <Route path="/scheduler-editor" element={
          <div>
            <NylasSchedulerEditor
              schedulerPreviewLink={`${window.location.origin}/?config_id={config.id}`}
              nylasSessionsConfig={{
                clientId: "53bbaecc-13e7-42c8-be42-e900c780765a", // Replace with your Nylas client ID from the previous
                redirectUri: `${window.location.origin}/scheduler-editor`,
                domain: "https://api.us.nylas.com/v3", // or 'https://api.eu.nylas.com/v3' for EU data center
                hosted: true,
                accessType: 'offline',
              }}
              defaultSchedulerConfigState={{
                  selectedConfiguration: {
                    requires_session_auth: false,
                    scheduler:{
                        rescheduling_url: `${window.location.origin}/reschedule/?booking_id=:booking_id`,
                        cancellation_url: `${window.location.origin}/cancel/?booking_id=:booking_id`,
                    }
                  }
              }}
            />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;   