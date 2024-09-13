#!/bin/bash
docker run -it --rm \
 -p 8888:8888 \
 -e DISPLAY=host.docker.internal:0 \
 -v $HOME/.Xauthority:/root/.Xauthority:rw \
 -v /mnt/c:/mnt/c:rw \
 -v /home/yammouch:/home/yammouch:rw \
 musyn0020
