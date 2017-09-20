import Ember from 'ember';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
// import QueryParamMap from '../mixins/query-param-map';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Component.extend(ParentMixin, ChildMixin, {
  @computed('childComponents.@each.selected')
  allChecked() {
    return this.get('childComponents')
      .filterBy('selected')
      .mapBy('value');
  },

  didInsertElement() {
    this.send('selectionChanged');
  },

  queryParamBoundKey: 'allChecked',

  actions: {
    selectionChanged() {
      const values = this.get('allChecked');
      const column = this.get('column');

      this.get('parentComponent')
        .send('updateSql', 'buildMultiSelectSQL', column, values);
    },
  },
});