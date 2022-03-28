import { types } from 'mobx-state-tree';

const App = types
  .model('App', {
    id: types.identifier,
    currentLevel: types.number,
    debug: types.boolean,
  })
  .actions(self => ({
    setCurrentLevel(to: number) {
      self.currentLevel = to;
    },
    setDebug(to: boolean) {
      self.debug = to;
    },
  }));

export default App;
