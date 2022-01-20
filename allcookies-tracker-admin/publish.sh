#!/bin/bash

DOCKER_REGISTRY=docker-registry.a-dev.com
REG_USER=antx
REG_PWD=Qwe344Jklld09

GIT_BRANCH=$(git branch --show-current)
GIT_COMMIT=$(git show -s --format=%H)

###
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

###

docker login -u $REG_USER -p $REG_PWD $DOCKER_REGISTRY

export RELEASE=${GIT_COMMIT}

docker-compose -f "${DIR}/docker-compose.yml" build --progress plain && \
docker-compose -f "${DIR}/docker-compose.yml" push


###

export KUBECONFIG="${DIR}/k8s/kubeconfig"

helm upgrade \
    --install \
    --namespace allcookies-tracker \
    --create-namespace \
    --set "image.tag=${GIT_COMMIT:-latest}" \
    --set "deployInfo.branch=${GIT_BRANCH:-$RELEASE}" \
    --set "deployInfo.commit=${RELEASE}" \
    --set "deployInfo.deployedBy=$(whoami)" \
    --set "deployInfo.deployedAt=$(date)" \
    --set "deployInfo.deployedFrom=$(hostname)" \
    --description "Commit ${GIT_COMMIT} branch ${GIT_BRANCH}" \
    allcookies-tracker-admin \
    "${DIR}/k8s/app"

kubectl rollout restart deployment -n allcookies-tracker