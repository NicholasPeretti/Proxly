# Proxly

A simple tool to be independent from your Backend

## What is Proxly?

Proxly is a Proxy server build in nodejs that allows you to work even when your web APIs are not available or when you are offline.

## How does it work?

Once configured and started, Proxly sniffs all the network requests of your application and, if they succeed, it will cache them.
As soon as you go offline or one of your web API goes down, you'll still be able to work just by setting Proxly in `CACHE_PREFERRED` mode, which uses the cache to provide the response you need

## Why should I use it?

Frontend developers care more about the data shape rather than the data itself and,
when QA environments are not available, it's hard to keep working.
Proxly aims to make developers independent from web APIs or internet connections in order to allow them
to keep working on their features, at least untill they are offline.
