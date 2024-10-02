<script setup>
import { AppState } from '@/AppState.js';
import { notebooksService } from '@/services/NotebooksService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const notebook = computed(() => AppState.activeNotebook)

onMounted(() => {
    getNotebookById()
})

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
    <section v-if="notebook">
        <h1>this is the notebook details page</h1>
        {{ notebook.title }}
    </section>
</template>


<style lang="scss" scoped></style>