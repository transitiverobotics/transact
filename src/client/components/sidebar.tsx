import React, { useContext } from "react";
import _ from 'lodash';

import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area";
import { ModeToggle } from "./ui/mode-toggle";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Bot, CircleUser } from "lucide-react";
import { UserContext } from "./user-context";
import { getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('Sidebar');
log.setLevel('debug');

/** Creates a button linking to the provided `to` link. Highlights the button
* when current location matches that link. */
const PageLink = ({section}) => {
  const location = useLocation();
  const to = `/${section.route}`;
  return <Link to={to} >
    <Button
      variant={location.pathname == to ? 'secondary' : 'ghost'}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full"
    >
      {section.icon}
      <span className="grow text-left">{section.name}</span>
    </Button>
  </Link>;
};

export function Sidebar({sections}){
  const {session, logout} = useContext(UserContext);
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bot className="h-6 w-6" />
          <span className="">SuperBots</span>
        </Link>
      </div>
      <ScrollArea className="grow grid items-start px-2 text-sm font-medium lg:px-4">
        {
          _.map(sections, (section, name) =>
            <PageLink section={section} key={name} />
          )
        }
      </ScrollArea>
      <ModeToggle/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full ml-2 mb-2 lg:ml-4 lg:mb-4">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {session && session.user && <DropdownMenuLabel>{session.user}</DropdownMenuLabel>}
          <DropdownMenuSeparator />
          {session && session.user && <DropdownMenuItem>
            <Button variant="ghost" onClick={logout}>Logout</Button>
          </DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}