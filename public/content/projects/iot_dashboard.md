# IoT Data Dashboard
## Real-time analytics for sensor data
**Status:** Open Source
**Year:** 2022
**GitHub:** github.com/YorkeF/iot-dashboard

---

## Overview

A real-time dashboard visualising data from IoT temperature and humidity
sensors across multiple locations. Built for a university lab monitoring
server room conditions — 200+ sensors across 6 floors.

## Features

- Live charts updating every 5 seconds via WebSockets
- Historical data exploration with date range picker
- Threshold alerts (email + Slack notifications)
- Multi-location support with floor plan overlays
- Export to CSV and PDF

## Technical Highlight

The tricky part: handling back-pressure when 200+ sensors fire
simultaneously. Solved with BullMQ queuing and batched DB writes,
reducing database load by **85%** without data loss.

## Tech Stack

`React` `D3.js` `Node.js` `InfluxDB` `BullMQ` `Redis`
`WebSockets` `Docker` `Raspberry Pi`
