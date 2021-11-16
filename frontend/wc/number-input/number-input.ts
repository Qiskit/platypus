import { css, customElement } from 'lit-element'
import BXNumberInput from 'carbon-web-components/es/components/number-input/number-input.js'

@customElement('q-number-input')
export default class QNumberInput extends BXNumberInput {
  static styles = [
    BXNumberInput.styles,
    css`
      .bx--number--lg.bx--number input[type="number"] {
        padding-right: 6rem;
        min-width: none;
      }
      .bx--label {
        line-height: 1.43;
      }
    `
  ]
}
