OS_ARCH="armv6l"        # Pi Zero
NODE_VERSION="v14.13.0"

# Just in case
sudo apt-get update

cd /tmp || exit

#
# NodeJS

wget -O node.tar.xy "https://unofficial-builds.nodejs.org/download/release/$NODE_VERSION/node-$NODE_VERSION-linux-$OS_ARCH.tar.xz"
tar xvfJ node.tar.xy

sudo cp -R ./node-$NODE_VERSION-linux-$OS_ARCH/* /usr/local

rm -rf node.tar.xy

echo "Node & NPM Installed"
node -v
npm -v

#
# App

cd /opt

sudo git clone https://github.com/moonthug/tp-server.git
cd tp-server

sudo apt-get install libudev-dev

npm install
