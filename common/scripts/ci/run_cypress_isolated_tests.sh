#!/bin/bash
if [[ "$RUN_PARALLEL" == true ]]; then
    : "${CURRENTS_CI_BUILD_ID:?}"
    : "${CURRENTS_PROJECT_ID:?}"
    : "${CYPRESS_RECORD_KEY:?}"
fi

set -e

DIR=$(echo $(cd $(dirname "${BASH_SOURCE[0]}") && pwd -P))
ROOT_DIR=$(echo $(cd $(dirname "${BASH_SOURCE[0]}")/../../../ && pwd -P))
E2E_TEST_DIR=$ROOT_DIR/libs/sdk-ui-tests-e2e
_RUSH="${DIR}/docker_rush.sh"
_RUSHX="${DIR}/docker_rushx.sh"

# : "${SDK_BACKEND:?}"

sdk_backend=$(tr <<< $SDK_BACKEND '[:upper:]' '[:lower:]')

pushd $E2E_TEST_DIR
cat > .env <<-EOF
SDK_BACKEND=${SDK_BACKEND:-BEAR}
HOST=dummy.gooddata.com
CYPRESS_TEST_TAGS=pre-merge_isolated_${sdk_backend}
FILTER=${FILTER:-}
EOF

$_RUSH install
$_RUSH build -t sdk-ui-tests-e2e
$_RUSHX libs/sdk-ui-tests-e2e prepare-recording-workspace-id
$_RUSHX libs/sdk-ui-tests-e2e build-scenarios

# Use Dockerfile_local as scenarios have been build in previous steps
export IMAGE_ID=${sdk_backend}-gooddata-ui-sdk-scenarios-${EXECUTOR_NUMBER}
trap "rm -f $E2E_TEST_DIR/.env; docker rmi --force $IMAGE_ID || true" EXIT

echo "Running against $SDK_BACKEND with at directory $E2E_TEST_DIR"
echo "Filtering by tags: $CYPRESS_TEST_TAGS"

docker build --no-cache --file Dockerfile_local -t $IMAGE_ID . || exit 1

NO_COLOR=1 docker-compose -f docker-compose-isolated.yaml up \
  --abort-on-container-exit --exit-code-from isolated-tests \
  --force-recreate --always-recreate-deps --renew-anon-volumes --no-color
