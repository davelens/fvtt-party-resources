var dashboard_template = `
<section id="party-resources-container">
  <h3>Party Resources</h3>
  <div class="flexrow">
    <div class="flexcol">
      <p>
        <span class="value">{{ inspiration }}</span><br>
        Inspiration
      </p>
    </div>
    <div class="flexcol">
      <p>
        <span class="value">{{ desperation }}</span><br>
        Desperation
      </p>
    </div>
    <div class="flexcol">
      <p>
        <span class="value">{{ influence_dice }}</span><br>
        Influence Dice
      </p>
    </div>
  </div>
</section>
`.trim()
