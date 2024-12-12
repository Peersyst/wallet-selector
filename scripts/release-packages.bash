#!/usr/bin/env bash

OTP=123456
TAG=latest

npm publish dist/packages/core --tag "${TAG}" 
npm publish dist/packages/modal-ui --tag "${TAG}" 
npm publish dist/packages/modal-ui-js --tag "${TAG}" 
npm publish dist/packages/wallet-utils --tag "${TAG}" 
npm publish dist/packages/ledger --tag "${TAG}" 
npm publish dist/packages/near-mobile-wallet --tag "${TAG}" 

