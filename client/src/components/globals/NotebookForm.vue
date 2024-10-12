<script setup>
import { notebooksService } from '@/services/NotebooksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()

const iconOptions = ['mdi-database', 'mdi-cloud', 'mdi-package', 'mdi-palette', 'mdi-home', 'mdi-code-array', 'mdi-xml', 'mdi-cash', 'mdi-food-apple', 'mdi-account', 'mdi-shield', 'mdi-pencil']

const notebookData = ref({
    title: '',
    icon: '',
    color: '#FFFFFF',
    coverImg: '',
})

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
    <form @submit.prevent="createNotebook()" class="row">
        <!-- <div class="col-md-6 mb-3">
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
            <select v-model="notebookData.icon" class="form-control" name="notebook-icon" id="notebook-icon" required>
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
        </div> -->


    </form>
</template>


<style lang="scss" scoped></style>