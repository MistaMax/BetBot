#!/bin/sh
#this is currently not being used directly, this is just a template to follow on the jenkins build pipeline itself
ssh ${NODESERVERUSER}@${NODESERVERIP} <<EOF
 cd ~/git/BetBot
 git pull
 npm install
 exit
EOF