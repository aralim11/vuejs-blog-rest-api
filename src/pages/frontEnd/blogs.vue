<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col-md-3">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="https://dummyimage.com/500x300.jpg/dddddd/000000" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-muted">9 mins {{ blog }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            blog(){
                return this.$store.getters['Blogs/blog'];
            }
        }
    }
</script>