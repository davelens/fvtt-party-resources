# FoundryVTT - Party Resources

![Latest release](https://img.shields.io/github/v/release/davelens/fvtt-party-resources?style=for-the-badge)

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

## FAQ
> Where can I access the resource dashboard?
Any permission level can access it at the top of the Actor directory.

> What about player-specific resources, can they be tracked too?
No, the intent for this module was to have global numeric values everyone could keep an eye on. However, [ardittristan/5eSheet-resourcesPlus](https://github.com/ardittristan/5eSheet-resourcesPlus) would probably serve your players better by having custom resources assigned to their character sheet.

> Do you write Foundry modules full time?
No, I don't have a Patreon going and don't get paid to write or maintain modules. I'm a software engineer by trade, and I've been writing web apps for 15 years. My main stack is both Ruby and Elixir, and I'm somewhat proficient in JavaScript, HTML, and CSS. Most of my work is backend-related so I'm not a frontend developer, and I'm sure it shows in the source code for those among you who are. I get by, though.

## License
This work is licensed under the MIT license, as well as Foundry Virtual Tabletop EULA - Limited License Agreement for module development from May 29, 2020.
