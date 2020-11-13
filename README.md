# FoundryVTT - Party Resources

![Latest release](https://img.shields.io/github/v/release/davelens/fvtt-party-resources?style=for-the-badge)
![Downloads](https://img.shields.io/github/downloads/davelens/fvtt-party-resources/total?style=for-the-badge)

Party Resources is a module that allows you to store party-wide numeric values,
scoped on worlds.

## Features
* Add/Edit/Delete custom resources
* Increment/decrement resource values
* Live updates for players when a value changes
* Optionally limit resources to a given maximum
* Track DM resources by hiding certain resources for players

## Example
I run my 5e games with party-based inspiration, rather than individual
inspiration. The maximum inspiration a party can earn equals the total number of
players. I needed a way to manage this value per game world in Foundry, and
allow my players to check up on how many inspirations they have left.

### What the DM sees  
![Image showing what the DM sees when opening the resources dashboard](https://davelens.be/screenshots/party-resources-dm.jpg?t=1604960703)

### What the players see
![Image showing what the players see when opening the resources dashboard](https://davelens.be/screenshots/party-resources-players.jpg?t=1604960703)

## Installation
1. Install Party Resources in FoundryVTT using the manifest URL:
```
https://raw.githubusercontent.com/davelens/fvtt-party-resources/master/module.json
```
2. Enable the `Party Resources` module in the active game world.

## Usage
Anyone can access the resources dashboard at the top of the Actor directory.

## License
This work is licensed under the MIT license, as well as Foundry Virtual Tabletop EULA - Limited License Agreement for module development from May 29, 2020.
