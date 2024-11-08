#!/usr/bin/env node

/************************************************************************
 Copyright (c) 2024, Transitive Robotics

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
************************************************************************/

'use strict';

const rosnodejs = require('rosnodejs');

// Requires the std_msgs message package
const sensor_msgs = rosnodejs.require('sensor_msgs').msg;
const std_msgs = rosnodejs.require('std_msgs').msg;

const POWER_SUPPLY_STATUS_CHARGING = 1;
const POWER_SUPPLY_STATUS_DISCHARGING = 2;

const dockLocation = {
  latitude: 37.451889,
  longitude: -122.176823
};

const philzCoffeeLocation = {
  latitude: 37.454392,
  longitude: -122.1826635
};

class Mockbot {
  docking;
  docked;
  navigating;
  location;

  constructor() {
    this.docking=false;
    this.docked=true;
    this.navigating=false;
    this.location={
      latitude: 37.451889,
      longitude: -122.176823,
      city: 'Menlo Park'
    };
    this.batteryCharge=100.0;
  }

  goto = async (destination) => {
    if(this.navigating) {
      console.log('Currently navigating');
      throw new Error('Currently navigating');
    }
    console.log(`Going to ${destination.latitude}, ${destination.longitude}`);
    this.navigating = true;
    this.docked = false;
    console.log(this);
    // approach location linearly in a loop until arrived, sleeping 1s between each step
    const startingDeltaLat = destination.latitude - this.location.latitude;
    const startingDeltaLong = destination.longitude - this.location.longitude;
    while (true) {
      const deltaLat = destination.latitude - this.location.latitude;
      const deltaLong = destination.longitude - this.location.longitude;
      const distance = Math.sqrt(deltaLat * deltaLat + deltaLong * deltaLong);
      if (distance < 0.0001) {
        this.navigating = false;
        return;
      } else {
        this.location.latitude += startingDeltaLat / 10;
        this.location.longitude += startingDeltaLong / 10;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  dock = async () => {
    if(this.docking) {
      console.log('Already docking');
      throw new Error('Already docking');
    }
    if(this.docked) {
      console.log('Already docked');
      throw new Error('Already docked');
    }
    this.docking = true;
    await this.goto(dockLocation);
    this.docking = false;
    this.docked = true;
  }

  getCurrentGPSLocation = async () => {
    const response = await fetch("https://ipconfig.io/json");
    const data = await response.json();
    this.location.latitude = data.latitude;
    this.location.longitude = data.longitude;     
    // get city data.city
    this.location.city = data.city;
  }
};

async function createMockBotNode() {
  const mockBot = new Mockbot();
  // Register node with ROS master
  rosnodejs.initNode('/transitive_mock_robot')
    .then((rosNode) => {
      console.log('ROS node initialized');

      // Create ROS pubs
      const batteryPub = rosNode.advertise('/battery_status', sensor_msgs.BatteryState, {latching: true});
      const gpsPub = rosNode.advertise('/gps/fix', sensor_msgs.NavSatFix, {latching: true});
      const cityPub = rosNode.advertise('/location/city', std_msgs.String, {latching: true});

      // publish battery state every 1s
      setInterval(() => {
        if (mockBot.docked) {
          mockBot.batteryCharge = Math.min(mockBot.batteryCharge + 2, 100.0);
        } else {
          mockBot.batteryCharge = Math.max(mockBot.batteryCharge - 2, 0.0);
        }

        const batteryState = new sensor_msgs.BatteryState();

        batteryState.charge = mockBot.batteryCharge;
        batteryState.power_supply_status = mockBot.docked ? POWER_SUPPLY_STATUS_CHARGING : POWER_SUPPLY_STATUS_DISCHARGING;
        // Publish over ROS
        batteryPub.publish(batteryState);
        // Log through stdout and /rosout
        rosnodejs.log.info(`Battery state published: ${batteryState.charge}%`);
      }, 1000);

      // publish GPS location every 1s
      setInterval(() => {
        const gpsLocation = new sensor_msgs.NavSatFix();
        gpsLocation.latitude = mockBot.location.latitude;
        gpsLocation.longitude = mockBot.location.longitude;
        gpsPub.publish(gpsLocation);
        rosnodejs.log.info(`GPS Location published: ${gpsLocation.latitude}, ${gpsLocation.longitude}`);

        const city = new std_msgs.String();
        city.data = mockBot.location.city;
        cityPub.publish(city);
      }, 1000);

      // Create ROS services
      rosNode.advertiseService('/dock', 'std_srvs/Trigger', async (req, res) => {
        try {
          await mockBot.dock();          
          res.success = true;
          res.message = 'Docked';
          return true;
        } catch (error) {
          console.error(error);
          res.success = false;
          res.message = error.message;
          return false;          
        }
      });

      rosNode.advertiseService('/goto_philz_coffee', 'std_srvs/Trigger', async (req, res) => {
        console.log('Going to Philz');
        try {
          await mockBot.goto(philzCoffeeLocation);       
          res.success = true;
          res.message = 'Arrived at Philz';
          return true;
        } catch (error) {
          console.error(error);
          res.success = false;
          res.message = error.message;
          return false;                 
        }
      });
    });
}

if (require.main === module) {
  // Invoke Main Talker Function
  createMockBotNode();
}