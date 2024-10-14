<script setup>
import { AppState } from '@/AppState.js';
import EntryCard from '@/components/globals/EntryCard.vue';
import EntryForm from '@/components/globals/EntryForm.vue';
import { router } from '@/router.js';
import { entriesService } from '@/services/EntriesService.js';
import { notebooksService } from '@/services/NotebooksService.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const activeNotebook = computed(() => AppState.activeNotebook)
const account = computed(() => AppState.account)
const entries = computed(() => AppState.entries)


watch(() => route.params.notebookId, () => {
    getNotebookById()
    getEntriesById()
}, { immediate: true })


async function getNotebookById() {
    try {
        await notebooksService.getNotebookById(route.params.notebookId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getEntriesById() {
    try {
        await entriesService.getEntriesById(route.params.notebookId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function deleteNotebook() {
    try {
        const wantsToDelete = await Pop.confirm('Are you sure you want to delete this notebook?')
        if (!wantsToDelete) { return }

        await notebooksService.deleteNotebook(route.params.notebookId)
        router.push({ name: 'Account' })
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section v-if="activeNotebook">
        <div class="container-fluid pt-3">
            <div class="row d-flex justify-content-center">
                <div class="col-10 notebook-title ms-3 mb-3 d-flex justify-content-center">
                    <h1 class="p-3 d-flex justify-content-center">{{ activeNotebook.title }}</h1>
                </div>
                <div class="col-2 d-flex justify-content-end w-1">
                    <button v-if="activeNotebook.creatorId == account?.id" @click="deleteNotebook()"
                        class="btn btn-danger rounded-pill mb-3">DELETE</button>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <EntryForm />
        </div>
        <!-- NOTE this is where the entries begin -->
        <div v-for="entry in entries" :key="entry.id" class="col-10 card ms-5">
            <EntryCard :entry="entry" />
        </div>


    </section>
</template>


<style lang="scss" scoped>
.notebook-title {
    background-color: #f8ca4c;
    border-radius: 1em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.card {
    margin-bottom: 1em;
    background-color: #f8ca4c;
}
</style>