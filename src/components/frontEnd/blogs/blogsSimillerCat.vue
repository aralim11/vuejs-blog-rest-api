<template>
    <div class="card mb-3 box-shadow">
        <img class="card-img-top" v-bind:src="imageLink" alt="Card image cap">
        <div class="card-body">
            <p class="card-text">{{ title }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <router-link v-bind:to="blogDetailLink"><button type="button" class="btn btn-sm btn-outline-secondary">View</button></router-link>
                </div>
                <small class="text-muted">{{ created_at }}</small>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['id', 'title', 'image', 'created_at'],
        computed: {
            imageLink(){
                return 'http://127.0.0.1:8000' + this.image;
            },

            blogDetailLink(){
                return '/details/' + this.id;
            }
        }
    }
</script>