<script setup>
import { Notebook } from '@/models/Notebook.js';


defineProps({ notebook: { type: Notebook, required: true } })

</script>


<template>
    <RouterLink :to="{ name: 'NotebookDetails', params: { notebookId: notebook.id } }">
        <div class="col-12">
            <img :src="notebook.coverImg" class="card-img-top" alt="Notebook cover photo">
        </div>
        <div class="col-12 card-body d-flex align-items-center">
            <div class="col-2">
                <h1><i class="mdi" :class="notebook.icon" :style="{ color: notebook.color }"></i></h1>
            </div>
            <div class="col-10">
                <h4>{{ notebook.title }}</h4>
            </div>
        </div>
    </RouterLink>
</template>


<style lang="scss" scoped></style>