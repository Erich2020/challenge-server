#!/bin/bash

VERSION="1.0.0"
IMAGE_NAME="challenge-server"
REMOTE_TAG_VERSION=${IMAGE_NAME}:${VERSION}
REMOTE_TAG_LATEST=${IMAGE_NAME}:latest

echo "Comienza generación de imagen de server en producción"
echo "Comenzando generación de imagen"
docker build -t ${REMOTE_TAG_LATEST} .
echo "Finalización de generación de imagen"
echo "Comenzando taggeo de imagen"
docker tag ${REMOTE_TAG_LATEST} ${REMOTE_TAG_VERSION}
echo "Finalización de taggeo de imagen"
echo "Finalización de generación de imagen de server en producción"
