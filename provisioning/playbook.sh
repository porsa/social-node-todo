#!/bin/bash

sudo apt-get upgrade -y
sudo apt-get install -y language-pack-fi
sudo apt-get install -y python-software-properties
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y git
sudo apt-get install -y mongodb-10gen

#After trying many online suggestions to fix this problem, I ended up adding the following to my ~/.bashrc:
#export LC_ALL=en_US.UTF-8

npm install -g yo
npm install -g generator-gruntfile
npm install -g grunt-cli
npm install -g passport-facebook
npm install mongoose-friends
cd /vagrant
npm install
bower install --allow-root
