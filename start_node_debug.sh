#!/bin/bash

node-inspector --save-live-edit &

while :
do
  clear;
  DATE=`date +%m/%d" @ "%H:%M:%S`
  echo -e "\nPress [CTRL+C] to stop (Restarted on $DATE)...\n\n"
  if (test "$1" == "break"); then
    npm run-script debug
  else
    npm run-script debug_nobreak
  fi
done

#npm run-script debug

#forever -p .forever -dv --watchDirectory=./ -al server.log start -c "npm run-script debug" ./
