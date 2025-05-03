# FoundryVTT - Party Resources

![Latest release](https://img.shields.io/github/v/release/davelens/fvtt-party-resources?style=for-the-badge&refreshplx=1)
![GitHub all releases](https://img.shields.io/github/downloads/davelens/fvtt-party-resources/total?color=blue&style=for-the-badge)
![GitHub release (by tag)](https://img.shields.io/github/downloads/davelens/fvtt-party-resources/1.8.3/total?color=blue&style=for-the-badge&refreshplx=4)
[![Donate](https://img.shields.io/static/v1?label=Tip&message=PayPal&color=green&style=for-the-badge)](https://www.paypal.com/donate/?business=S4YPUE3P8ZK52&no_recurring=0&item_name=I+maintain+Party+Resources+in+my+%28limited%29+free+time.+Donations+are+not+necessary%2C+but+very+welcome+and+encouraging!&currency_code=EUR)
[![Donate](https://img.shields.io/static/v1?label=Tip&message=Ko-Fi&color=green&style=for-the-badge)](https://www.ko-fi.com/davelens)

Party Resources is a system-agnostic FoundryVTT module that allows you to manage party-wide, numeric values that persist between sessions.

## State of development (2024 and onwards)
Currently, development on this module is on indefinite hiatus due to certain lifestyle changes I had to make for my health. I will do what is necessary to keep the module play nice with Foundry's major updates, at least until they decide to overhaul the way the module stores its data. Pull requests without major changes (translations, typos, CSS bugs,...) will continue to be reviewed and merged, with the occassional release.

Thank you for understanding!

## Features
* Add/Edit/Delete custom resources, with optional icon images
* Increment/decrement resource values
  * Hold `CTRL` (Win) or `CMD` (macos) when clicking to jump by +/- 10
  * Hold `SHIFT` when clicking to jump by +/- 100
* Live updates for players when values change
* Sports a videogame-esque status bar to easily keep track of resources
  * Clicking the status bar opens up the dashboard
  * Hold `CTRL` (Win) or `CMD` (macos) and click a resource to open its edit form
* Sort your resources using drag/drop in the dashboard
* Track DM resources by hiding certain resources for players
* D&D 5e: Track gold, or items across players' inventory
* Optionally notify players through chat when a resource value changes
* Optionally limit resources to a given maximum
* Optionally hand over resource management to players
* Optionally use icon images as resource labels
* Change resource values in script macros through a public-facing API

## Examples
* Tracking the quantity of ingame resources like building materials, ingredients, or army sizes
* Tracking custom quantified "meta" resources like sanity, desperation, or fame levels
* Tracking DM-specific mnemonics like poison counters, population totals, or player deaths 😈
* D&D 5e: Tracking all your party's D&D 5e platinum, eternum, silver, and gold into one amount (in gold)
* D&D 5e: Tracking all rations in players' inventory into one amount (for those Tomb of Annihilation sessions amirite?)
* D&D 5e: Tracking all normal and greater healing potions in players' inventory into one amount

### What the DM sees in the dashboard
![Image showing what the DM sees when opening the resources dashboard](https://user-images.githubusercontent.com/221527/154817180-5dcb0c95-845f-4ef3-a8e8-9b734b2feda7.jpeg)

### What the players see in the status bar
![Image showing what the players see in the status bar](https://user-images.githubusercontent.com/221527/154817026-a84c4290-c2b4-4d92-9e12-1474fd627635.jpeg)

### How the status bar can look when tracking D&D 5e gold or specific items
![Image showing how D&D 5e resources look like in the status bar](https://user-images.githubusercontent.com/221527/203189855-8c44fd1f-a5fb-4628-82a8-6d471173e413.jpg)

## Installation
1. Install Party Resources in FoundryVTT using the manifest URL:
```
https://raw.githubusercontent.com/davelens/fvtt-party-resources/master/module.json
```
2. Enable the `Party Resources` module in the active game world.

## Translations
If your desired translation is missing, you can help out through the [Weblate](https://weblate.foundryvtt-hub.com/engage/party-resources/) page for Party Resources! In return you will receive my eternal gratitude, and quite possibly various riches in an eventual afterlife.

## FAQ
### I don't see the status bar?

You need to enable it in the module's settings.

### Where can I access the resource dashboard?

By default, any permission level can access it through the button at the top of the Actor directory. However, a DM has the option to hide this button.

### What about player-specific resources, can they be tracked too?

No, the intent for this module was to have global numeric values everyone could keep an eye on. However, [ardittristan/5eSheet-resourcesPlus](https://github.com/ardittristan/5eSheet-resourcesPlus) would probably serve your players better by having custom resources assigned to their character sheet.

### Why do I need to explicitly allow players to modify configuration settings so they can manage resources?

Because resources are an amalgam of settings scoped on `world`, to make them persist in the world for all players. Foundry requires explicit permission to allow players to adjust the values linked to these settings with a scope of `world`. Not doing so will result in error popups stating a player is not allowed to edit settings.

### How do you track multiple, specific items into one resource?
You need to separate the name of the items with a semicolon, like so:
![Screenshot of the "edit resource" form, with an example of multiple items separated by a semicolon](https://user-images.githubusercontent.com/221527/203414879-2abde694-4af3-4ccd-a4a1-0b1be89e7d11.jpg)

### How can I refresh the status bar using a macro?
```js
window.pr.status_bar.render()
```

### How can I open the dashboard using a macro?
```js
window.pr.dashboard.redraw(true)
```
### How do I change resource values in a script macro?
As an example, say you wanted to change a resource called `Fate Counters` that you gave a resource ID of `fate` when you created it.

To retrieve the value of the `fate` resource:
```js
window.pr.api.get('fate')
```

To set the value of the `fate` resource to `5`:
```js
window.pr.api.set('fate', 5)
```

To increment the value of the `fate` resource by `2`:
```js
window.pr.api.increment('fate', 2)
```

To decrement the value of the `fate` resource by `1`:
```js
window.pr.api.decrement('fate', 1)
```

To set the value of the `fate` resource to `5`, and notify players with a chat
message. Note that this will only work if "Notify players of value changes" is checked in the resource settings:
```js
window.pr.api.set('fate', 5, { notify: true })
```

The resource dashboard will then process the change in real time.

### Do you write Foundry modules full time?

No, I don't have a Patreon going and don't get paid to write or maintain modules. I'm a software engineer by trade, and I've been writing web apps for 15 years. My main stack is both Ruby and Elixir, and I'm somewhat proficient in JavaScript, HTML, and CSS. Most of my work is backend-related so I'm not a frontend developer, and I'm sure it shows in the source code for those among you who are. I get by, though.

### I have a different question about your module. Can I ping you on Discord?

Sure: `Pretzl#0001` - I'm in the official FoundryVTT Discord.

## License
This work is licensed under the MIT license, as well as Foundry Virtual Tabletop EULA - Limited License Agreement for module development from May 29, 2020.
