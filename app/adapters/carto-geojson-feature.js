import DS from 'ember-data';
import config from 'labs-zola/config/environment';

const { carto } = config;

export default DS.JSONAPIAdapter.extend({
  host: carto.domain,
  urlForQuery() {
    const baseUrl = this.buildURL();

    return `${baseUrl}/api/v2/sql`;
  },
});
