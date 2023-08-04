#!/bin/bash

# $1 - directory, from which the dump should be restored
# $2 - (optional) name of the docker container with the database

if [ ! -f ".env" ]; then
  echo "Error: .env file not found in the current directory"
  exit 1
elif [ -z "$1" ]; then
  echo "Error: please provide a path to the directory containing the DB dumps as the first argument"
  exit 2
fi

source .env

# Directory that contains the DB dumps
DUMP_DIR=$1
# Gets the newest dump
FILENAME=$(ls "$DUMP_DIR" | sort | tail -n 1)
echo -e "\nRestoring from $DUMP_DIR/$FILENAME. Continue? (y/N)"
read $ANSWER

if [ "$ANSWER" == "y" ]; then
  if [ -n "$2" ]; then
    DB_CONTAINER=$2
  else
    DB_CONTAINER=cc-mongo
  fi

  # Copy dump to Docker container
  sudo docker cp "$DUMP_DIR/$FILENAME" $DB_CONTAINER:/$FILENAME
  # Extract dump
  sudo docker exec $DB_CONTAINER sh -c "tar -xvzf /$FILENAME"
  # Delete archive
  sudo docker exec $DB_CONTAINER sh -c "rm -f /$FILENAME"

  # Restore collections
  collections=( "competitions" "people" "rounds" "results" "recordtypes" "events" "schedules" )

  for col in "${collections[@]}"; do
    sudo docker exec $DB_CONTAINER mongorestore -u $MONGO_DEV_USERNAME -p $MONGO_DEV_PASSWORD --db cubingcontests -c $col /dump/cubingcontests/$col.bson
  done

  # Delete dump directory
  sudo docker exec $DB_CONTAINER sh -c "rm -rf /dump"

  echo -e "\nDone!"
else
  echo -e "\nAborting"
fi