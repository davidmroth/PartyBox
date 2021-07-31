#!/bin/bash

gcc -c -Wall -fpic main.c
gcc -pthread main.o stagekit.o extern.o -o test
