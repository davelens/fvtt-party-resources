var dashboard_template = `
<div id="party-resources" class="flexrow">
  <h4 style="text-align: center;">Party Inspiration</h4>
  <div class="flexrow">
    <h5>Inspiration</h5>
    {{ inspiration }}
  </div>
  <div class="flexrow">
    <h5>Desperation</h5>
    {{ desperation }}
  </div>
  <div class="flexrow">
    <h5>Influence Dice</h5>
    {{ influence_dice }}
  </div>
</div>
`.trim()
