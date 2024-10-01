<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { notebooksService } from '@/services/NotebooksService.js';

const account = computed(() => AppState.account)

onMounted(() => {
  getUserNotebooks()
})

async function getUserNotebooks() {
  try {
    await notebooksService.getUserNotebooks()
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <section class="container">
    <div class="row d-flex justify-content-center">
      <!-- NOTE all main content will go in this col-8 -->
      <div class="col-8">
        <section class="container-fluid">
          <div class="row">
            <div class="col-12">
              <!-- NOTE notebook form goes here -->
              <h1>Notebook Form</h1>
            </div>
          </div>
        </section>
        <hr />
        <section class="container-fluid">
          <div class="row">
            <div class="col-12">
              <!-- NOTE chronologically ordered 'all entries' goes here-->
              <p>Browse All Entries</p>
            </div>
          </div>
        </section>

      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
