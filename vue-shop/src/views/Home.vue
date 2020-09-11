<template>
  <div class="home container">
    <Navbar></Navbar>
    <Hero></Hero>
    <Login></Login>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Navbar from '@/components/Navbar.vue'
  import Hero from '@/components/Hero.vue'
  import Login from '@/components/Login.vue'

  export default {
    name: 'Home',
    components: {
      Navbar,Hero,Login
    }
  }
</script>
