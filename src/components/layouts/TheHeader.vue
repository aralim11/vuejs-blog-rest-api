<template>
    <header>
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <router-link to="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">VueBlog</span>
            </router-link>

            <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <router-link class="me-3 py-2 text-dark text-decoration-none" to="/">Home</router-link>
                <router-link class="me-3 py-2 text-dark text-decoration-none" to="/dash">Dashboard</router-link>
                <router-link class="me-3 py-2 text-dark text-decoration-none" to="/sign-up">Sign Up</router-link>
                <router-link class="py-2 text-dark text-decoration-none" to="/sign-in">Sign In</router-link>
            </nav>
        </div>
    </header>
</template>