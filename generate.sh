#!/bin/bash

# Define parameters passed in 
DIR_NAME=$1
# More variables
CONTINUE=true
folders=("assets" "classwork" "deliverables" "homework" "materials")

# Check if directory is empty
if [ -z "$DIR_NAME" ]; then
    CONTINUE=false ;
    echo "Empty Parameter: Exiting";
fi

# Check if directory already exists
if [ -d "$DIR_NAME" ]; then
    CONTINUE=false ;
    echo "Directory $DIR_NAME already exists";
fi


if [ $CONTINUE == true ]; then
    mkdir $DIR_NAME;
    cd $DIR_NAME;
    touch README.md; 
    echo "# $DIR_NAME
# Learning Objectives
# Classwork
## Getting Started
## Troubleshooting
## Clean Up
# Deliverables
# Links
# Homework
# Materials
" > README.md
    for i in "${folders[@]}"
    do
        mkdir $i;
        cd $i;
        cd ../;
    done
    cd ../;
    echo $DIR_NAME Created;
fi
