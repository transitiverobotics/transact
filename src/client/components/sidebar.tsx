import React from "react";
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area";

import { Section } from "../models/section"


interface SidebarProps {
    sections: Section[];
    onSectionClick: (section: Section) => void;
    selectedSection: Section;
}

export function Sidebar({ sections, onSectionClick, selectedSection }: SidebarProps) {
    return (
        <ScrollArea className="hidden lg:block overflow-y-auto border-x-2 pt-2">
            {sections.map((section, i) => (
                <Button
                    key={`${section}-${i}`}
                    variant={selectedSection.name === section.name ? "secondary" : "ghost"}
                    className="w-full justify-start font-normal"
                    onClick={() => onSectionClick(section)}
                >
                    {section.name}
                </Button>
            ))}
        </ScrollArea>
    );
}