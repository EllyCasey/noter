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
        <div class="col-2">
          <button v-if="account" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
            class="btn btn-danger rounded-pill">Notebooks
            <i class="mdi mdi-notebook"></i></button>
        </div>
      </div>
    </section>
    <router-view />
    <OffCanvas v-if="account" />

  </main>
  <footer>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
