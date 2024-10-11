import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TopBar() {
    return <div className="col-span-2 p-2 shadow flex flex-row flex-nowrap">
        <img src="/src/client/assets/logo.svg" className="h-9 flex-none"/>
        <div className="grow h-9 text-3xl pl-2">Transact</div>
        <Avatar className="flex-none h-9">
            <AvatarImage src="/src/client/assets/avatar.jpg" alt="User avatar"/>
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
    </div>;
}