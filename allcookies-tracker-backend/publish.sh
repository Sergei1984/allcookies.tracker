#!/bin/bash

DOCKER_REGISTRY=docker-registry.a-dev.com
GIT_COMMIT=$(git show -s --format=%H)
GIT_BRANCH=$(git branch --show-current)
REG_USER=antx
REG_PWD=Qwe344Jklld09
# export RELEASE=${GIT_COMMIT}


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

export KUBECONFIG="${DIR}/k8s/kubeconfig"

# DOCKER_COMPOSE_FILE="${DIR}/docker-compose.yml"

# docker login -u $REG_USER -p $REG_PWD $DOCKER_REGISTRY

# docker-compose -f "${DIR}/app/docker-compose.yml" build --progress plain && \
# docker-compose -f "${DIR}/app/docker-compose.yml" push

# if [[ $? == "1" ]]
# then
#     echo "Error building ${S}"
#     exit 1
# fi


helm upgrade \
    --install \
    --namespace allcookies-tracker \
    --set "imageLabel=${RELEASE:-latest}" \
    --set "deployInfo.branch=${GIT_BRANCH:-$RELEASE}" \
    --set "deployInfo.commit=${RELEASE}" \
    --set "deployInfo.deployedBy=$(whoami)" \
    --set "deployInfo.deployedAt=$(date)" \
    --set "deployInfo.deployedFrom=$(hostname)" \
    --create-namespace \
    --description "Commit ${GIT_COMMIT} branch ${GIT_BRANCH}" \
    allcookies-tracker-admin \
    "${DIR}/k8s/app/allcookies-tracker"

kubectl rollout restart deployment -n allcookies-tracker-admin