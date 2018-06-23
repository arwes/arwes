#!/bin/bash

# release the project with the version of the @arwes/arwes package to GitHub
# this process can be done either before or after the release to npm

GIT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# the branch has to be "master", the production/public branch
if [ "$GIT_BRANCH" != "master" ]
then
  echo "The current branch is not master."
  exit 1
fi

# since the project uses spaces, we determine the version by using two
# spaces in the beginning of the property
PKG_VERSION=`eval cat packages/arwes/package.json | grep "  \"version\":"`
PKG_VERSION="${PKG_VERSION/version/}"
PKG_VERSION="${PKG_VERSION//[\ \"\,\:]/}"

PKG_TAG="v$PKG_VERSION"

git tag $PKG_TAG

# create one CHANGELOG.md file with all the project history
npm run changelog
git add . --all
git commit -m "[chore] release $PKG_TAG"

git push origin master
git push origin $PKG_TAG

echo "Released to GitHub as $PKG_TAG"
