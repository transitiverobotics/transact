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
