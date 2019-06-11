import Component from '@ember/component';
import { action } from '@ember/object';

export default class LocateMeMobileComponent extends Component {
  // feature for mobile users to make button more visible
  // button attached to geolocate that functions the same as geoLocate

  findMeDismissed = false;

  // TODO: let's refactor this action to make it easier to test
  @action
  locateMe() {
    const geolocateButton = document.querySelectorAll('.mapboxgl-ctrl-geolocate')[0];

    if (geolocateButton) {
      geolocateButton.click();
      this.set('findMeDismissed', true);
    }
  }

  // an action to dismiss the feature and only show geolocate button
  @action
  dismissFindMe() {
    this.set('findMeDismissed', true);
  }
}
