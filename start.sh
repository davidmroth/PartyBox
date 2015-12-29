#!/bin/bash

while true; do
  reset
  npm start

  if (test $? -ne 0); then
    break
  fi
done
