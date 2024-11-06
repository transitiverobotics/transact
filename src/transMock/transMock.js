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

const currentBatteryState = new sensor_msgs.BatteryState();
const currentGpsLocation = new sensor_msgs.NavSatFix();
const currentCity = new std_msgs.String();

currentBatteryState.charge = 0.0;
currentBatteryState.power_supply_status = POWER_SUPPLY_STATUS_CHARGING;



function createTransMockNode() {
  // Register node with ROS master
  rosnodejs.initNode('/transitive_mock_robot')
    .then((rosNode) => {
      console.log('ROS node initialized');
      console.log(currentBatteryState);
      // Create ROS publisher on the 'chatter' topic with String message
      const batteryPub = rosNode.advertise('/battery_status', sensor_msgs.BatteryState, {latching: true});

      // publish battery state every 1s
      setInterval(() => {
        // Construct the message
        console.log(currentBatteryState.charge);
        console.log(currentBatteryState.power_supply_status);

        if (currentBatteryState.charge >= 100.0) {
          currentBatteryState.power_supply_status = POWER_SUPPLY_STATUS_DISCHARGING;
        } else if (currentBatteryState.charge <= 0.0) {
          currentBatteryState.power_supply_status = POWER_SUPPLY_STATUS_CHARGING;
        }
        if (currentBatteryState.power_supply_status === POWER_SUPPLY_STATUS_CHARGING) {
          currentBatteryState.charge = Math.max(currentBatteryState.charge + 3, 0.0);
        } else {
          currentBatteryState.charge = Math.min(currentBatteryState.charge - 3, 100.0);
        }
        // Publish over ROS
        batteryPub.publish(currentBatteryState);
        // Log through stdout and /rosout
        rosnodejs.log.info(`Battery state published: ${currentBatteryState.charge.toFixed(2)}%`);
      }, 1000);

      // Publish lat/long every 10 seconds
      const gpsPub = rosNode.advertise('/gps/fix', sensor_msgs.NavSatFix, {latching: true});
      const cityPub = rosNode.advertise('/location/city', std_msgs.String, {latching: true});
      setInterval(async () => {
        // get lat/long from https://ipconfig.io/json
        const response = await fetch("https://ipconfig.io/json");
        const data = await response.json();
        currentGpsLocation.latitude = data.latitude;
        currentGpsLocation.longitude = data.longitude;     
        gpsPub.publish(currentGpsLocation);
        rosnodejs.log.info(`GPS Location published: ${currentGpsLocation.latitude}, ${currentGpsLocation.longitude}`);
        // get city data.city
        currentCity.data = data.city;
        cityPub.publish(currentCity);
        rosnodejs.log.info(`City published: ${currentCity.data}`);
      }, 10000);

    });
}

if (require.main === module) {
  // Invoke Main Talker Function
  createTransMockNode();
}