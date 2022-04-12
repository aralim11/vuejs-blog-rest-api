<template>
    <div>
        <h1>{{ rate }}</h1>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            rate(){
                return this.id;
            },
        }
    }
</script>