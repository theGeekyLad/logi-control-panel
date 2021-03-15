import dbus
from gi.repository import GLib
from dbus.mainloop.glib import DBusGMainLoop
import subprocess
import time
import datetime


def blink():
    subprocess.run(['g413-led', '-fx', 'breathing', 'all', 'ff0000', '2'])
    # time.sleep(1.3)
    time.sleep(1)
    subprocess.run(['g413-led', '-a', 'ff0000'])


def blink_off():
    subprocess.run(['g413-led', '-fx', 'breathing', 'all', 'ff0000', '2'])
    time.sleep(1)
    subprocess.run(['g413-led', '-a', '000000'])


def notifications(bus, message):
    args = message.get_args_list()
    # args are
    # (app_name, notification_id, icon, summary, body, actions, hints, timeout)
    print("Notification from app " + str(args[0]) + " at " + str(datetime.datetime.now()))
    # print("Summary: %s" % args[3])
    # print("Body: %s", args[4])
    # print("Actions: %s", args[5])
    # print("Hints: %s", args[6])
    # print("Timeout: %s", args[7])
    # print('x-kde-origin-name', args[6]['x-kde-origin-name'])
    # if args[6]['x-kde-origin-name'] == 'web.whatsapp.com':
    if args[0] != 'KDE Connect':
        # print("Notification from app '%s'" % args[0])
        print("Shine LED.")
        blink_off()
    print('\n\n')
    # print([arg for arg in message.get_args_list()])


DBusGMainLoop(set_as_default=True)

bus = dbus.SessionBus()
bus.add_match_string_non_blocking("eavesdrop=true, interface='org.freedesktop.Notifications', member='Notify'")
bus.add_message_filter(notifications)

loop = GLib.MainLoop()
loop.run()
