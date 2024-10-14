<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import OffCanvas from './components/globals/OffCanvas.vue';
import { computed } from 'vue';

const account = computed(() => AppState.account)

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <section class="container">
      <div class="row">
        <div class="col-2 pt-4">
          <button v-if="account" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
            class="btn btn-danger rounded-pill p-2">Notebooks
            <i class="mdi mdi-notebook"></i></button>
        </div>
      </div>
    </section>
    <router-view />
    <OffCanvas v-if="account" />
    <section class="container-fluid">
      <div class="row">
        <div class="col-4">
          <img class="helper-dude"
            src="https://images.vexels.com/media/users/3/318413/isolated/preview/17ff412266bfeec2285f267cc98920e4-capybara-wearing-a-nice-hat.png"
            alt="">

        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

main {
  background-image: url('https://img.freepik.com/premium-vector/cute-capybara-cartoon-seamless-pattern-vector-illustration_42750-1237.jpg');
  background-color: rgba(255, 255, 255, 0.25);
  background-blend-mode: lighten;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.helper-dude {
  position: fixed;
  bottom: 0px;
  right: 0px;
  max-height: 15em;
}

.helper-dude:hover {
  max-height: 10em;
}
</style>
