# Baz Truck App

## Introduction

Baz Truck App source code for TabCorp

## Requirements

- [Node.js](https://nodejs.org/) v8.9 or newer

## Setup

``` bash
npm install
```
## Test
``` bash
npm test
```
## Run
``` bash
npm start
```

## How to Use the App
```
1. Start Node.js Server
 - npm start
2. Open the browser on Desktop / Laptop
 - input the URL: http://localhost:3000 to open the home page
 - watch the page which data will update frequently
3. Or open the browser on Smart Phone
 - input the URL: http://server:3000 to open the home page
 - please note: change server to your node server ip if no server domain name. 
4. Controll the alarm sound
 - select / deselect the checkbox of Mute Alarm 
5. Monitor the real time data
 - watch the console output of Noe.js server to see the details
 - watch the web page to see the containers's status
6. Customize the App
 - change the default configuration from /server/config.js
7. Note
 - there are 6 contaiers and 5 beer types
 - default timer period is 30s
 - default sample period is 3*30 s
 - default alarm period is the abnormal temperature lasts 2*30 s 
 - each container has its own sample period
 - sample period will be changed dynamically if the container has issues
 - use random value (3-9) to mock the real time temperature
 - use console output to mock the action of adjustment temperature
```

## Highlights
### 1. Architecture
  Using Node.js + Socket.io + Web to provide the real time data to the clients.
### 2. Algorithm
  Dynamically adjust the interval of sample period, and each container has its own sample interval.
  If the temperature is abnormal, then app will reduce the sample interval to monitor and manipulate it more frequently.
  Alert Baz if the temperature is abnormal for a long time.
  If the temperature is normal, then resets the sample interval to the default value to reduce the network load.

  From this dynamically schedule algorithm, Baz can easy handle the Summer weather and human errors like leaving the container ajar.
### 3. UX
  When Baz is busy unloading, he still can use his smart phone to receive the Error alarm if there are some containers cannot keep in their healthy ranges. 
  Baz can find out which containers he needs to check from his smart phone, even he is out of his truck.  
  Baz also can mute the alarm if he knows the issues will not be fixed in a short time.

## Improvement 
### 1. Algorithm
  Predictability. Recording the alarm events and weather information, analyse and find out the deep regularities. Use the regularities to adjust the sample interval to avoid the abnormal temperature in Summer season.
  
  Accuracy. Due to use random numbers to mock sensor data, so the current application can not monitor and trace the temperature changing accurately. In the real environment, the temperature will rise from lower to upper. So the app can control the air condition earlier when the temperature starts to rise. So that the app can reduce the number of abnormal temperature.
### 2. UX
  Baz can customize the schedule strategy if he wants. For example, he can ask to refrigerate the special container before he opens the container's door to unload.    

## Directory Layout

```
.
├── /server/                        # application's source code
│   ├── App.js                      # main application routin
│   ├── config.js                   # default configuration
|   ├── /models
|   |     └── Container.js          # define Container Class    
|   ├── /services
|   |     ├── ContainerServices.js  # define ContainerServices Class
|   |     ├── ScheduleService.js    # define ScheduleService Class
|   |     └── SocketIOServices.js   # define SocketIOServices Class 
|   ├── /utils
|   |     ├── logger.js             # logger functions
|   |     └── message.js            # message function 
│   └── /test                       # 
|         └── Container.js          # App.test.js
├── /public/                        # web page source code
│   ├── index.html                  # home page
|   ├── /js
|   |     └── index.js              # main js file    
|   ├── /css                        # bootstrap css file
|   ├── /assets
|   |     └── alarm.mp3            # message function 
│   └── /assets                     
|         └── alarm.mp3            # 
├── /node_modules/                 # 3rd-party libraries and utilities
├── .eslintrc.json                 # eslint config file
├── .gitignore                     # gitignore file
├── index.js                       # the App's main entry
├── jest.confing.js                # Jest config file
├── nodemon.json                   # gitignore file
├── package.json                   # contains 3rd party libraries and utilities
├── package-lock.json              # this file used by npm
└── README.md                      
```
