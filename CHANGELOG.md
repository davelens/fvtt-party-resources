1.2.0
--
* Added a Chinese language localisation file. Many thanks to user [hmqgg](https://github.com/hmqgg)!
* Added Azzurite's settings extender as a lib to make use of file uploads.
* Refactored the registration of resources into a SPOT.
* Fix an issue with newly made resources showing `undefined` in their first
  notification.
* Added functionality to use an image as a resource label.


1.1.5.1
--
* Move the registration of toggle-actors-button-for-players into ModuleSettings.
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
