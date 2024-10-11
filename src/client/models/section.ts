import React from 'react';

export class Section {
  name: string;
  component: React.FC;
  constructor(name: string, component: React.FC) {
    this.name = name;
    this.component = component;
  }
}
