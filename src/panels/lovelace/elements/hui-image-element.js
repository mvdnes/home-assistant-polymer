import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import "../components/hui-image.js";

import ElementClickMixin from "../mixins/element-click-mixin.js";
import { longPressBind } from "../common/directives/long-press-directive";

/*
 * @appliesMixin ElementClickMixin
 */
class HuiImageElement extends ElementClickMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host(.clickable) {
          cursor: pointer;
          overflow: hidden;
          -webkit-touch-callout: none !important;
        }
        hui-image {
          -webkit-user-select: none !important;
        }
      </style>
      <hui-image
        hass="[[hass]]"
        entity="[[_config.entity]]"
        image="[[_config.image]]"
        state-image="[[_config.state_image]]"
        camera-image="[[_config.camera_image]]"
        filter="[[_config.filter]]"
        state-filter="[[_config.state_filter]]"
        title$="[[computeTooltip(hass, _config)]]"
        aspect-ratio="[[_config.aspect_ratio]]"
      ></hui-image>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      _config: Object,
    };
  }

  ready() {
    super.ready();
    longPressBind(this);
    this.addEventListener("ha-click", () =>
      this.handleClick(this.hass, this._config, false)
    );
    this.addEventListener("ha-hold", () =>
      this.handleClick(this.hass, this._config, true)
    );
  }

  setConfig(config) {
    if (!config) {
      throw Error("Error in element configuration");
    }

    this.classList.toggle("clickable", config.tap_action !== "none");
    this._config = config;
  }
}
customElements.define("hui-image-element", HuiImageElement);
