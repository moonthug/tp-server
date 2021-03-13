OS_ARCH="armv6l" # Pi Zero
NODE_VERSION="v14.13.0"

cd /tmp || exit

wget -O node.tar.xy "https://unofficial-builds.nodejs.org/download/release/$NODE_VERSION/node-$NODE_VERSION-linux-$OS_ARCH.tar.xz"
tar xvfJ node.tar.xy

sudo cp -R ./node-$NODE_VERSION-linux-$OS_ARCH/* /usr/local

rm -rf node.tar.xy

node -v
npm -v
