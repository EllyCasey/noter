<script setup>
import { AppState } from '@/AppState.js';
import { Notebook } from '@/models/Notebook.js';
import { router } from '@/router.js';
import { notebooksService } from '@/services/NotebooksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';


const notebooks = computed(() => AppState.notebooks)

const iconOptions = ['mdi-database', 'mdi-cloud', 'mdi-package', 'mdi-palette', 'mdi-home', 'mdi-code-array', 'mdi-xml', 'mdi-cash', 'mdi-food-apple', 'mdi-account', 'mdi-shield', 'mdi-pencil']

const notebookData = ref({
    title: '',
    icon: '',
    color: '',
    coverImg: '',
})

onMounted(() => {
    getUserNotebooks()
})


defineProps({ notebook: { type: Notebook, required: true } })




async function getUserNotebooks() {
    try {
        await notebooksService.getUserNotebooks()
    }
    catch (error) {
        Pop.error(error);
    }
}


async function createNotebook() {
    try {
        const createdNotebook = await notebooksService.createNotebook(notebookData.value)
        resetForm()
        router.push({ name: 'NotebookDetails', params: { notebookId: createdNotebook.id } })
    }
    catch (error) {
        Pop.error(error);
        logger.error(error)
    }
}

function resetForm() {
    notebookData.value = {
        title: '',
        icon: '',
        color: '',
        coverImg: '',
    }
}

</script>


<template>
    <div class="offcanvas offcanvas-start hide" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="createNotebook()" class="row">
                <div class="col-md-6 mb-3">
                    <label for="notebook-title">Title:</label>
                    <input v-model="notebookData.title" name="notebook-title" id="notebook-title" class="form-control"
                        minlength="3" maxlength="25" type="text" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="notebook-coverImg">Cover Image:</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-camera"></i></span>
                        <input v-model="notebookData.coverImg" class="form-control" type="url" maxlength="500"
                            name="notebook-coverImg" id="notebook-coverImg" required>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="notebook-icon">Icon:</label>
                    <select v-model="notebookData.icon" class="form-control" name="notebook-icon" id="notebook-icon"
                        required>
                        <option disabled value="">please select...</option>
                        <option v-for="icon in iconOptions" :key="icon" :value="icon">{{ icon }}</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="notebook-color">Color:</label><br>
                    <input v-model="notebookData.color" type="color" class="notebook-color" name="notebook-color"
                        id="notebook-color" required>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary">submit</button>
                </div>
            </form>
            <hr />
            <section class="container-fluid">
                <div class="row">
                    <div v-for="notebook in notebooks" :key="notebook.id" class="col-12 card notebook-card p-3">
                        <div>
                            <i class="mdi fs-3 me-4" :class="notebook.icon" :style="{ color: notebook.color }"></i>
                            <span>{{ notebook.title }}</span>
                        </div>
                        <RouterLink :to="{ name: 'NotebookDetails', params: { notebookId: notebook.id } }">
                            <div>
                                <i class="mdi mdi-exit-to-app fs-1 selectable"></i>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.card {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
    background-color: #f8ca4c;
}
</style>