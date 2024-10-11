<script setup>
import { AppState } from '@/AppState.js';
import { entriesService } from '@/services/EntriesService.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const notebooks = computed(() => AppState.notebooks)

const entryData = ref({
    description: '',
    img: '',
})

async function createEntry() {
    try {
        const createdEntry = await entriesService.createEntry(entryData.value)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <form @submit.prevent="createEntry()">
        <div class="container">
            <div class="row card">
                <div class="col-10">
                    <h2 class="ms-2">Entry Form</h2>
                    <textarea v-model="entryData.description" id="entry-description" name="entry-description" rows="10"
                        cols="50" class="form-control m-1" required>text contents here...
                    </textarea>
                </div>
                <div class="col-12 d-flex flex-direction-row">
                    <div class="col-md-4 mb-3">
                        <label for="entry-img">Image:</label>
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-camera"></i></span>
                            <input v-model="entryData.img" class="form-control" type="url" maxlength="500"
                                name="entry-img" id="entry-img" required>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 ms-1">
                        <label for="notebook-titles">Notebooks:</label>
                        <select class="form-control" name="notebook-titles" id="notebook-titles" required>
                            <option disabled value="">please select...</option>
                            <option value="notebook1">placeholder..</option>
                        </select>
                    </div>
                    <button class="round ms-2 mt-2"><i class="mdi mdi-plus"></i></button>
                </div>
            </div>
        </div>
    </form>
</template>


<style lang="scss" scoped>
button.round {
    background-color: #ff0000;
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

button.round:hover {
    background-color: #eb3c3c;
}
</style>