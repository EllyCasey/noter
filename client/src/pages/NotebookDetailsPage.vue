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
        <h1>this is the notebook details page</h1>
        {{ activeNotebook.title }}
    </section>
</template>


<style lang="scss" scoped></style>