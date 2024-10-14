<script setup>
import { AppState } from '@/AppState.js';
import { Entry } from '@/models/Entry.js';
import { entriesService } from '@/services/EntriesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';


const notebooks = computed(() => AppState.notebooks)



const entryData = ref({
    description: '',
    img: '',
    notebookId: null,
    id: '',
})

const Props = defineProps({ entry: { type: Entry, required: true } })

onMounted(() =>
    entryData.value = Props.entry
)

async function UpdateEntry() {
    try {
        await entriesService.updateEntry(entryData.value)
        Pop.success('Changes saved!')
    }
    catch (error) {
        Pop.error(error);
        logger.error(error)
    }
}
// NOTE THIS IS WRONG
async function deleteEntry() {
    // try {
    //     const wantsToDelete = await Pop.confirm('Are you sure you want to delete this entry?')
    //     if (!wantsToDelete) { return }
    //     await entriesService.deleteEntry(route.params.entryData)
    // }
    // catch (error) {
    //     Pop.error(error);
    //     logger.error(error)
    // }
}
</script>


<template>
    <form @submit.prevent="UpdateEntry()">
        <div class="col-12">
            <h1 v-if="entry.notebookId" :style="{ backgroundImage: `url(${entry.notebook.coverImg})` }">{{
                entry.notebook.title }}
            </h1>
            <h1 v-else class="pt-2"></h1>
            <!-- v-if and v-else to show or hide notebook title(if there is one) -->
        </div>
        <div class="col-12">
            <img :src="entry.img" class="card-img-top" alt="entry cover photo">
        </div>
        <div class="col-12 card-body align-items-center">
            <div class="col-12">
                <textarea v-model="entryData.description" class="form-control" rows="10" cols="50"></textarea>
            </div>
            <div class="col-12 d-flex flex-direction-row justify-content-between">
                <div class="col-md-4 col-12 mb-3">
                    <label for="entry-img">Image:</label>
                    <input v-model="entryData.img" type="url" maxlength="500" name="entry-img">
                </div>
                <div class="col-md-4 col-12 mb-3">
                    <label for="notebook-titles">Notebooks:</label>
                    <select v-model="entryData.notebookId" class="form-control" name="notebook-titles"
                        id="notebook-titles">
                        <option v-for="notebook in notebooks" :key="notebook.title" :value="notebook.id">{{
                            notebook.title }}</option>
                    </select>
                    <div class="d-flex justify-content-end">
                        <button class="round-save  ms-2 mt-2"><i class="mdi mdi-content-save-all-outline"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div class="col-12 d-flex justify-content-center ">
        <button @submit.prevent="deleteEntry()" class="round-delete  ms-2 mt-2 mb-3"><i
                class="mdi mdi-delete"></i></button>
    </div>
    <div class="col-12 d-flex justify-content-end me-2">
        <p>Updated at: {{ entry.updatedAt.toLocaleString() }}</p>
    </div>
</template>


<style lang="scss" scoped>
img {
    max-height: 40dvh;
}

button.round-save {
    background-color: #228c0f;
    color: black;
    border: none;
    padding: 5px;
    font-size: 36px;
    height: 60px;
    width: 60px;
    box-shadow: 0 2px 4px darkslategray;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

button.round-save:hover {
    background-color: #19b01e;
}

button.round-delete {
    background-color: #b01919;
    color: black;
    border: none;
    padding: 5px;
    font-size: 36px;
    height: 60px;
    width: 60px;
    box-shadow: 0 2px 4px darkslategray;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

button.round-delete:hover {
    background-color: #ff0000;
}
</style>