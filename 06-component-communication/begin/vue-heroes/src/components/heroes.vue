nm
<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <div class="columns">
        <div class="column is-8" v-if="heroes">
          <!-- <heroes-list> -->
          <ul v-if="!selectedHero">
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">
                      {{ hero.firstName }} {{ hero.lastName }}
                    </div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button
                    class="link card-footer-item"
                    @click="selectHero(hero)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <!-- <heroes-list> -->

          <!-- <hero-detail> -->
          <HeroDetail
            v-if="selectedHero"
            :hero="selectedHero"
            @cancel="cancelHero"
            @save="saveHero"
          />
          <!-- </hero-detail> -->

          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { heroWatchers, lifecycleHooks, ourHeroes } from '../shared';
import HeroDetail from './hero-detail';
import { logger } from '../shared';

export default {
  name: 'Heroes',
  components: { HeroDetail },
  mixins: [lifecycleHooks, heroWatchers],
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
      capeMessage: '',
    };
  },
  created() {
    this.loadHeroes();
    logger.info(`${this.componentName} created hook called`);
  },
  methods: {
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
    },

    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
};
</script>
