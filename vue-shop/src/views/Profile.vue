<template>
    <!-- disable eslint -->
    <div>
        <dir class="container">
            <button class="btn btn-primary">Profile</button>
            <button class="btn btn-primary">Account Settings</button>
            <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Full Name"
                       aria-label="Username"
                       aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Phone"
                       aria-label="Recipient's username"
                       aria-describedby="basic-addon2">
            </div>

            <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Address">
            </div>

            <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Postcode">
            </div>
            <button class="btn btn-primary">Save changes</button>
        </dir>

    </div>
</template>

<script>
    // disable eslint
    export default {

    }
</script>

<style>
    .container {
      width: 500px;
      margin-left: 300px;
    }
    .container>button {
        margin-right:10px;
        margin-bottom: 10px;
    }
</style>
