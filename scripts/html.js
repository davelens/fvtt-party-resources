var dashboard_template = `
<section id="party-resources-container">
  <h4>Party Resources</h4>
  <div class="flexrow">
    <div>
      <p>
        Inspiration
        {{ inspiration }}
      </p>
    </div>
    <div>
      <p>
        Desperation
        {{ desperation }}
      </p>
    </div>
    <div>
      <p>
        Influence Dice
        {{ influence_dice }}
      </p>
    </div>
  </div>
</section>
`.trim()
