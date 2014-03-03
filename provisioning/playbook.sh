#!/bin/bash

sudo apt-get upgrade -y
sudo apt-get install -y language-pack-fi
sudo apt-get install -y python-software-properties
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y git