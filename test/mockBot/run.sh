#!/bin/bash
source /opt/ros/noetic/setup.bash
export PATH=$HOME/.transitive/usr/bin:$PATH

node mockBot.js
