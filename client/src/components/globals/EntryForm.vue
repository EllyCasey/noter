<script setup>
import { Entry } from '@/models/Entry.js';


</script>


<template>
    <div class="container">
        <div class="row card">
            <div class="col-10">
                <h2 class="ms-2">Entry Form</h2>
                <textarea id="entry-description" name="entry-description" rows="10" cols="50" class="form-control m-1">text contents here...
                </textarea>
            </div>
            <div class="col-12 d-flex flex-direction-row">
                <div class="col-md-4 mb-3">
                    <label for="entry-img">Image:</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-camera"></i></span>
                        <input class="form-control" type="url" maxlength="500" name="entry-img" id="entry-img" required>
                    </div>
                </div>
                <div class="col-md-4 mb-3 ms-1">
                    <label for="notebook-titles">Notebooks:</label>
                    <select class="form-control" name="notebook-titles" id="notebook-titles" required>
                        <option disabled value="">please select...</option>
                        <option value="notebook1">placeholder..</option>
                        <option value="notebook2">placeholder2..</option>
                    </select>
                </div>
                <button class="round ms-2 mt-2"><i class="mdi mdi-plus"></i></button>
            </div>
        </div>
    </div>
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