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
