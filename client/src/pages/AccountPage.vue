<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { notebooksService } from '@/services/NotebooksService.js';
import NotebookCard from '@/components/globals/NotebookCard.vue';
import NotebookForm from '@/components/globals/NotebookForm.vue';


const notebooks = computed(() => AppState.notebooks)

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
              <NotebookForm />
            </div>
          </div>
        </section>
        <section class="container-fluid">
          <div class="row">
            <div class="col-12">
              <!-- NOTE chronologically ordered 'all entries' goes here-->
              <h2 class="browse-entries">Browse All Entries</h2>
            </div>
            <hr />
            <div v-for="notebook in notebooks" :key="notebook.id" class="col-12 card notebook-card p-1 selectable">
              <NotebookCard :notebook="notebook" />

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

.notebook-card {
  background-color: #f8ca4c;
  margin: 1em;
  color: black;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.browse-entries {
  color: white;
  text-shadow: 2px 2px 4px black;
  font-size: 40px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}
</style>
