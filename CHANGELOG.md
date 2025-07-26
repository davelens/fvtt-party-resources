1.8.5
--
- Made it so whenever permission is granted for players to modify resources, it also explicity includes the `Trusted Player` level.
- Added a patch on init that makes sure the "Trusted Player" permission level can modify resources whenever the regular Player level can.


1.8.4
--
- Fixed an issue where the Party Resources button would appear twice in the actors directory (this occurred mainly in pf2e, but should be fixed for other systems as well).
- Ukrainian language template was added through Weblate.


1.8.3
--
- Added a module setting to opt into a full width status bar. The default is "not full width".
- Added a module setting to align "not full width" status bars to the left, right, or center (default).
- Made it so full width status bars follows the above new setting's values, but for status bar contents, instead.
- Removed Settings Extender as a dependency in favour of Foundry's built in FilePicker (FINALLY! 😉).


1.8.2
--
- Removed some keys from the manifest that have been deprecated since v10. That should get rid of the warnings in v13's setup screen.
- Lowered the font-size of the text labels in the status bar slightly (1rem -> 0.9rem).
- Used `ui.actors.render()` instead of the now defunct `ActorDirectory.collection.render()`; this fixes the broken "change status bar location"-setting in v13.
- Fixed the chat textarea overlapping with the status bar when the sidebar is expanded with the chatbox visible.
- Fixed the broken image alignment of the "text below image"-setting in v13.
- Fixed a bunch of deprecation warnings related to major future Foundry versions (v15+).


1.8.1
--
In addition to the compatibility release, this is a bugfix release for v13:
* Fixed the broken "first time"-notification modal:
  * Fixed broken "Click here", which was due to `renderActorDirectory` no longer passing the `html` callback argument as an object.
  * Fixed the broken click trigger for the actors directory
  * Re-aligned the bouncing arrow to actually point to the height of the Party Resources button again.
* Fixed the distorted status bar:
  * Removed the `flexrow` class from the `li` elements.
  * Set `li > img` to display as inline blocks (was set to `block` in v13).
  * Removed the excess padding/margin accumulated since v11.
* Fixed the deprecation warnings for v14 caused by `mergeObject`, which will move to the `foundry.utils` namespace.


1.8.0
--
* Changed the compatibility to Foundry version 13.
* Added the Czech translation through Weblate.


1.7.0
--
* Changed the compatibility to Foundry version 12.


1.6.0
--
* Paved the way for FoundryVTT version 11
* Added the French translation, thanks to @Elfenduil !
* Added the Polish translation, thanks to @gbursson !
* Added the Spanish translation, thanks to @WallaceMcGregor !
* Added the Russian translation, thanks to @Kikimor !
* Updated the Chinese translation, thanks to @TravelingK !


1.5.0
--
* Added functionality that sanitizes a resource's identifier when typing its 
name.
* Added functionality to allow for system-specific currency and/or item
tracking.
* A bunch of refactoring to allow for easier extending of system-specific
trackers.


1.4.4
--
Prevent players from accessing the edit resource button.


1.4.3
--
Many thanks to user @jagoe for the following additions:

* Clicking the status bar will open up the dashboard
* `CTRL` (Win) or `CMD` (macos) + clicking a resource opens its edit form


1.4.2 - Dutch translation!
--
* Configured the repository for incoming Weblate PR's
* Added the dutch translation through Weblate.


1.4.1 - Bugfix release
--
* Made sure drag/drop works when dragging icon images in the dashboard, as well.


1.4.0 
--
* Added a way to sort your resources in the dashboard using drag/drop (#50).
* Split up the resource notification message into separate ones for 
increments / decrements (#32).
* Fixed an issue with the Add a new resource-button collapsing in on itself 
when resizing the window (since Foundry 10).
* Fixed another lingering issue with a resource's default values not setting 
a blank string for *_name resources.


1.3.1
--
* Resources now have strict types and default values set when they get
registered in game.settings.
* Fixed an issue (#48) that caused resources with blank (ie. undefined) values 
to throw [Setting.value]: may not be undefined errors and block the dashboard 
from opening. You should now see placeholders (which you can safely edit) for 
all values that bugged out.


1.3.0a
--
* Added the "compatibility" section in module.json to get rid of the warnings in
Foundry's module install.


1.2.9
--
* Fixed an issue with the message body not showing up in notifications.


1.2.8
--
* Added FR translation. Thank you, @sladecraven !
* Fixed an issue with resource visibility resetting when updating a resource
through the resource form.
* Extracted the notification message markup in preparation for notification box
changes in a later update.


1.2.7
--
* Added a videogame-esque status bar to keep track of resources at a glance.
* Added a setting to control rendering the status bar at the top or the bottom
of the game canvas.


1.2.6a (Hotfix release)
--
* Fixed an issue with the new automated GitHub workflow not selecting `src/` to 
be included in the module.zip file. Oops.


1.2.6
--
* Added a GitHub workflow to automate module.json and module.zip creation. Done
so I can monitor how many downloads this module receives. The workflow was 
taken from the League of Foundry Developers' module template.
* Restructured some folder names within the module for personal convenience.


1.2.5
--
* Changed the compatibleCoreVersion setting to Foundry v9.

I want to use this space for anyone keeping up with the changes of this module
to state that the module is NOT abandoned. Covid-19 is having an affect on both 
my personal and professional life, so my time spent in and around D&D is 
limited. It is what it is, but I hope I can dedicate more time to D&D in 2022.


1.2.4
--
* Added missing JA translations due to recent additions to the module. Thanks 
again, @BrotherSharper !


1.2.3
--
* Bump to accommodate FoundryVTT 0.8.8 stable release channel after testing it out.


1.2.2
--
* Added missing CN translations due to recent additions to the module. Thanks 
again, @hmqgg !


1.2.1
--
* Bump to accommodate FoundryVTT 0.8.6 stable release channel after testing it 
out.


1.2.0
--
* Added functionality to use an image as a resource label.
* Provided a module setting to choose how icon images are displayed: Either icon
on top with text below it, or floating text on top of the icon image.
* Added Azzurite's settings extender as a dependency to make use of file
  uploads.
* Refactored the registration of resources into a single point of truth.
* Fixed an issue with newly made resources showing `undefined` in their first
  notification.
* Added some headers to the resource form to make it more readable.


1.1.6
--
* Added a Chinese language localisation file. Many thanks to user [hmqgg](https://github.com/hmqgg)!
* Added a Japanese language localisation file. Many thanks to users
  [touge](https://github.com/touge) and [BrotherSharper](https://github.com/BrotherSharper)!


1.1.5.1
--
* Move the registration of toggle_actors_button_for_players into ModuleSettings.
This fixes players not seeing the Party Resources button in the Actors Directory
unless they refresh.


1.1.5
--
* Added functionality to notify players in chat when a resource changes.
* Added a way for DMs to customise the chat message for resource value changes.


1.1.4
--
* Fixed an issue with the version number in the menu bar of the resource
  dashboard blocking the click+drag functionality of the window.
* Moved CursorTooltip out of the public facing API.
* Changed the initial popup to only show up for DMs, not players.
* Added a module setting to control the Party Resources button visibility for
  players.


1.1.3
--
* Added a first-time-startup popup to guide new users to the dashboard.
* Replace the permissions button in the resource form with a way to set the
  correct permission automatically.
* Reworked how the public APIs are exposed, now through `window.pr.*`.


1.1.2
--
* Fixed an issue where a resource's min/max values were not respected when their
  value was 0.
* Pressing CTRL on Windows (CMD on macOS) when clicking the +/- buttons will
  add/subtract 10 instead of 1.
* Pressing SHIFT when clicking the +/- buttons will add/subtract 100 instead of 1.


1.1.1
--
* Made it so longer resource labels (19+ characters) are properly word-wrapped
  instead of bleeding through the +/- buttons.
* Allow for negative values when decrementing resource values.
* Add functionality to not let negative values exceed a given minimum.
