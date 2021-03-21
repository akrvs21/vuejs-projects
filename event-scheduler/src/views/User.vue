<template>
<!-- <h1>{{$route.params.username}}'s space...</h1> This is not very flexible way -->
<h1>{{username}}'s space...</h1>
</template>

<script>
    export default {
        props: ['username']
    }
</script>