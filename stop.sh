#!/bin/zsh

PID_FILE="pids.txt"
if [ -f "$PID_FILE" ]; then
  while read -r PID; do
    echo "Stopping process with PID: $PID"
    kill "$PID"
  done < "$PID_FILE"

  # Remove the PID file
  rm "$PID_FILE"

  echo "Processes stopped."
else
  echo "No PID file found. No processes to stop."
fi

echo "Stopping ActiveMQ container"
docker stop $(docker ps -q --filter ancestor=symptoma/activemq:latest)

echo "Stopping nginx container"
docker stop my-custom-asi-nginx-container

echo "Done."
