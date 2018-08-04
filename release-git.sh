#!/bin/sh

# release the project with the version of the @arwes/arwes package to GitHub
# this process should be done after lerna publish has been ran

log() {
  echo "\033[1;36m$1\033[0m"
}

# the current branch has to be "master", the production/public branch
GIT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ "$GIT_BRANCH" != "master" ]
then
  log "The current branch is not master."
  exit 1
fi

PKG_VERSION=$(cat packages/arwes/package.json | grep "\"version\": \".*\"")
PKG_VERSION=$(echo $PKG_VERSION | sed -e "s/version//" | sed -e "s/[\ \"\:\,]//g")
PKG_TAG="v$PKG_VERSION"

log "Releasing as $PKG_TAG..."

# commit all changes and set a release tag
git add .
git commit -m "release: $PKG_TAG"
git tag $PKG_TAG

# update CHANGELOG.md file
npm run changelog
git add CHANGELOG.md
git commit -m "chore: changelog"

# sync with server
git push origin master
git push origin $PKG_TAG

log "Released as $PKG_TAG"
