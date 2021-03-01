<template>
    <div class="notification-bar"
         :class="notificationTypeClass">
        <p>{{ notification.message }}</p>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: {
            notification: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                timeoout: null
            }
        },
        mounted() {
            this.timeoout = setTimeout(() => this.remove(this.notification), 5000)
        },
        beforeDestroy() {
            clearTimeout(this.timeoout)
        },
        computed: {
            notificationTypeClass() {
                return `-text-${this.notification.type}`
            }
        },
        methods: mapActions('notification', ['remove'])
    }
</script>

<style scoped>
    .notification-bar {
      margin: 1em 0 1em;
    }
    .-text-error p {
      font-weight: 500;
      color: red;
    }
    .-text-success p {
      font-weight: 500;
      color: green;
    }
</style>