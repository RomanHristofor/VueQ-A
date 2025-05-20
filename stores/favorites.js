import {defineStore} from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),
  getters: {
    currentFilter: (state) => state.favorites
  },
  actions: {
    toggleFavorite(id) {
      const index = this.favorites.indexOf(id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(id);
      }
    }
  }
});