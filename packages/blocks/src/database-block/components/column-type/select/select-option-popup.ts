import { DeleteIcon, PenIcon } from '@blocksuite/global/config';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SelectTagAction, SelectTagActionType } from '../../../types.js';
import { isDivider } from '../../../utils.js';
import { actionStyles } from '../../edit-column-popup.js';

const tagActions: SelectTagAction[] = [
  {
    type: 'rename',
    text: 'Rename',
    icon: PenIcon,
  },
  {
    type: 'divider',
  },
  {
    type: 'delete',
    text: 'Delete',
    icon: DeleteIcon,
  },
];

@customElement('affine-database-select-action-popup')
export class SelectActionPopup extends LitElement {
  static override styles = css`
    :host {
      z-index: 11;
    }
    .affine-database-select-action {
      width: 200px;
      padding: 8px;
      border: 1px solid var(--affine-border-color);
      border-radius: 4px;
      background: var(--affine-white);
      box-shadow: 0px 0px 12px rgba(66, 65, 73, 0.14),
        inset 0px 0px 0px 0.5px var(--affine-white);
    }
    ${actionStyles}
    .action {
      color: var(--affine-text-primary-color);
    }
    .action svg {
      width: 20px;
      height: 20px;
    }
    .rename,
    .delete {
      fill: var(--affine-icon-color);
    }
  `;

  @property()
  index!: number;

  @property()
  onAction!: (type: SelectTagActionType, index: number) => void;

  override render() {
    return html`
      <div class="affine-database-select-action">
        ${tagActions.map(action => {
          if (isDivider(action))
            return html`<div class="action-divider"></div>`;

          return html`
            <div
              class="action ${action.type}"
              @mousedown=${() => this.onAction(action.type, this.index)}
            >
              <div class="action-content">
                ${action.icon}<span>${action.text}</span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
