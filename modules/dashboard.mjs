// TODO: Find out if this HTML can be in an actual template file instead.

export default class CustomResourcesDashboard {
  static template() {
    return `
<section id="custom-resources-container">
  <h3>Party Resources</h3>
  <div class="flexrow">
    <div class="flexcol">
      <p>
        <span class="value">{{ inspiration }} / {{ max_inspiration }}</span><br>
        Inspiration
      </p>
    </div>
    <div class="flexcol">
      <p>
        <span class="value">{{ desperation }} / {{ max_desperation }}</span><br>
        Desperation
      </p>
    </div>
    <div class="flexcol">
      <p>
        <span class="value">{{ influence_dice }} / {{ max_influence_dice }}</span><br>
        Influence Dice
      </p>
    </div>
  </div>
</section>
`.trim()
  }
}
