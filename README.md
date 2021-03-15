# Logi Control Panel _(for `Linux`)_

A rudimentary GUI contol panel for Logitech keyboards on Linux built on top of [this awesome CLI](https://github.com/MatMoul/g810-led). Additionally, you can also have the LEDs pulse when there's an incoming notification on your PC (e.g. mails, WhatsApp web, and so on).

![Logi Control Panel - Screenshot](https://github.com/theGeekyLad/logi-control-panel/blob/master/screenshot.png)

Watch the demo [here](https://youtu.be/rWDX9CpRSdQ)!

## Supported Boards

- Logitech G413 Carbon _(monochrome red LEDs)_

## Prerequisites

- Python 3.x
- Node.js
- A supported board _of course_
- Ensure the LEDs are ON on the keyboard _(usually `Fn+F7`)_

## Setup

- Clone / download as ZIP this repo
- Extract ZIP and open extracted directory
- Open terminal here
- `python -m pip install PyGObject`
- `python -m pip install dbus-python`
- `npm i`

## Run

`npm run start`

## Foibles

- Notifications from **KDE Connect** will not pulse the LED

---

Made with :heart: by `theGeekyLad`