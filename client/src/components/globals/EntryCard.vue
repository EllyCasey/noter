<script setup>
import { Entry } from '@/models/Entry.js';


defineProps({ entry: { type: Entry, required: true } })
</script>


<template>
    <div class="col-12">
        <img :src="entry.img" class="card-img-top" alt="entry cover photo">
    </div>
    <div class="col-12 card-body d-flex align-items-center">
        <div class="col-12">
            <h4 class="entry-description">{{ entry.description }}</h4>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>