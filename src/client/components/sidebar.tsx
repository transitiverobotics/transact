import React from "react";
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area";

import { Link, useLocation } from "react-router-dom";

import _ from 'lodash';

/** Creates a button linking to the provided `to` link. Highlights the button
* when current location matches that link. */
const PageLink = ({section}) => {
  const location = useLocation();
  const to = `/${section.toLowerCase()}`;

  return <Link to={to}>
    <Button
      variant={location.pathname == to ? 'secondary' : 'ghost'}
      className="w-full justify-start font-normal"
    >
      {section}
    </Button>
  </Link>;
};

export function Sidebar({sections}) {

  return (
    <ScrollArea className="hidden lg:block overflow-y-auto border-x-2 pt-2">
      {
        _.map(sections, (element, section) =>
          <PageLink section={section} key={section} />
        )
      }
    </ScrollArea>
  );
}