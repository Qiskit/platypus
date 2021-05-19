// =============================================================================
// q-block Component
// =============================================================================

import { CustomElementView, ElementView, register } from '@mathigon/boost';

const template = '<div class="qb-title"></div><div class="qb-body"><slot></slot></div>';

@register('q-block', {template})
export class QBlock extends CustomElementView {
  private $title!: ElementView
  private $body!: ElementView

  ready() {
    this.$title = this.$('.qb-title')
    this.$body = this.$('.qb-body')

    if (this.$body.children.length) {
      const t = this.$body.children.shift()
      this.$title.append(t)
    }
  }
}
