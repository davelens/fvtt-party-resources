# FoundryVTT - Party Resources

![Latest release](https://img.shields.io/github/v/release/davelens/fvtt-party-resources?style=for-the-badge)

Party Resources is a module that allows you to store party-wide numeric values,
scoped on worlds.

## Features
* Add/Edit/Delete custom resources
* Increment/decrement resource values
  * Hold `CTRL` (Windows) or `CMD` (MacOS) when clicking to jump by +/- 10
  * Hold `SHIFT` when clicking to jump by +/- 100
* Live updates for players when values change
* Track DM resources by hiding certain resources for players
* Optionally limit resources to a given maximum
* Optionally hand over resource management to players

## Examples
* Tracking the quantity of ingame resources like building materials, ingredients, or army sizes
* Tracking custom quantified "meta" resources like sanity, desperation, or fame levels
* Tracking DM-specific mnemonics like poison counters, population totals, or player deaths 😈

### What the DM sees
![Image showing what the DM sees when opening the resources dashboard](https://davelens.be/screenshots/party-resources-dm.jpg?t=1607638881)

### What the players see
![Image showing what the players see when opening the resources dashboard](https://davelens.be/screenshots/party-resources-players.jpg?t=1607638881)

## Installation
1. Install Party Resources in FoundryVTT using the manifest URL:
```
https://raw.githubusercontent.com/davelens/fvtt-party-resources/master/module.json
```
2. Enable the `Party Resources` module in the active game world.

## FAQ
### Where can I access the resource dashboard?

Any permission level can access it through the button at the top of the Actor directory.

### What about player-specific resources, can they be tracked too?

No, the intent for this module was to have global numeric values everyone could keep an eye on. However, [ardittristan/5eSheet-resourcesPlus](https://github.com/ardittristan/5eSheet-resourcesPlus) would probably serve your players better by having custom resources assigned to their character sheet.

### Why do I need to explicitly allow players to modify configuration settings so they can manage resources?

Because resources are an amalgam of settings scoped on `world`, to make them persist in the world for all players. Foundry requires explicit permission to allow players to adjust the values linked to these settings with a scope of `world`. Not doing so will result in error popups stating a player is not allowed to edit settings.

### Do you write Foundry modules full time?

No, I don't have a Patreon going and don't get paid to write or maintain modules. I'm a software engineer by trade, and I've been writing web apps for 15 years. My main stack is both Ruby and Elixir, and I'm somewhat proficient in JavaScript, HTML, and CSS. Most of my work is backend-related so I'm not a frontend developer, and I'm sure it shows in the source code for those among you who are. I get by, though.

## License
This work is licensed under the MIT license, as well as Foundry Virtual Tabletop EULA - Limited License Agreement for module development from May 29, 2020.
