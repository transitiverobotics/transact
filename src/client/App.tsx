import React from "react";
import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import { Section } from "./models/section";
import { DevicesSection } from "./sections/devicessection";
import { VideoSection } from "./sections/videosection";
import { TerminalSection } from "./sections/terminalsection";
import { HealthSection } from "./sections/healthsection";
import { ConfigSection } from "./sections/configsection";
import { TeleopSection } from "./sections/teleopsection";
import { ThemeProvider } from "./components/theme-provider"

import "./App.css";

const sections = [
    new Section("Devices", DevicesSection),
    new Section("Video", VideoSection),
    new Section("Teleoperation", TeleopSection),
    new Section("Terminal", TerminalSection),
    new Section("Health", HealthSection),
    new Section("Configuration", ConfigSection),
];

// Just an example how to get env vars on the front-end in Vite (anything with
// the VITE prefix)
// See sample.env for descriptions for these:
const host = import.meta.env.VITE_HOST; // Transitive deployment
const transitiveId = import.meta.env.VITE_TRANSITIVE_USER;
const SSLs = import.meta.env.VITE_INSECURE ? '' : 's';
const transitivePortal = `http${SSLs}://portal.${host}`;

console.log({host, transitiveId, SSLs, transitivePortal});

function App() {
    const [selectedSection, setSelectedSection] = useState<Section>(sections[0]);

    const handleSectionClick = (section: Section) => {
        setSelectedSection(section);
    }

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {
            <div className="grid h-screen grid-rows-[50px_auto] grid-cols-[300px_auto] ">
                <TopBar />
                <Sidebar sections={sections} onSectionClick={handleSectionClick} selectedSection={selectedSection} />
                <div className="overflow-y-auto p-4">
                    {selectedSection.component({})}
                </div>
            </div>
            }
        </ThemeProvider>
    );
}

export default App;
