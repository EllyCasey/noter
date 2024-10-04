<script setup>
import { AppState } from '@/AppState.js';
import { notebooksService } from '@/services/NotebooksService.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const activeNotebook = computed(() => AppState.activeNotebook)

watch(() => route.params.notebookId, () => {
    getNotebookById()
}, { immediate: true })


async function getNotebookById() {
    try {
        await notebooksService.getNotebookById(route.params.notebookId)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section v-if="activeNotebook">
        <div class="container-fluid">
            <div class="row d-flex justify-content-center">
                <div class="col-6 notebook-title">
                    <h1 class="p-2">{{ activeNotebook.title }}</h1>
                </div>
            </div>
        </div>

    </section>
</template>


<style lang="scss" scoped>
.notebook-title {
    background-color: #f8ca4c;
    border-radius: 1em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>