import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { scheduleOnce } from '@ember/runloop';
import { on } from '@ember-decorators/object';

export default Mixin.create({
  metrics: service(),

  @on('routeDidChange')
  trackPage() {
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.url;
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.metrics.trackPage({ page, title });
    });
  },
});
