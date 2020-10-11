<template>
    <!-- eslint-disable  -->
    <!-- eslint-disable  -->
    <div class="admin">
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <nav id="sidebar"
                 class="sidebar-wrapper">
                <div class="sidebar-content">
                    <!-- sidebar-brand  -->
                    <div class="sidebar-item sidebar-brand">
                        <a href="#">pro sidebar</a>
                    </div>
                    <!-- sidebar-header  -->
                    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                        <div class="user-pic">
                            <img class="img-responsive img-rounded"
                                 src="img/user.jpg"
                                 alt="User picture">
                        </div>
                        <div class="user-info">
                            <span class="user-name">Jhon
                                <strong>Smith</strong>
                            </span>
                            <span class="user-role">{{ email }}</span>
                            <span class="user-status">
                                <i class="fa fa-circle"></i>
                                <span>Online</span>
                            </span>
                        </div>
                    </div>
                    <!-- sidebar-search  -->
                    <div class="sidebar-item sidebar-search">
                        <div>
                            <div class="input-group">
                                <input type="text"
                                       class="form-control search-menu"
                                       placeholder="Search...">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-search"
                                           aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- sidebar-menu  -->
                    <div class="sidebar-item sidebar-menu">
                        <ul>
                            <li class="header-menu">
                                <span>Menu</span>
                            </li>
                            <li>
                                <router-link to='/admin/overview'>
                                    <i class="fa fa-chart-line"></i>
                                    <span class="menu-text">Overview</span>
                                    <!-- <span class="badge badge-pill badge-warning">New</span> -->
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/admin/products'>
                                    <i class="fab fa-amazon"></i>
                                    <span class="menu-text">Products</span>
                                    <!-- <span class="badge badge-pill badge-danger">3</span> -->
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/orders">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span class="menu-text">Orders</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/profile">
                                    <i class="fa fa-user"></i>
                                    <span class="menu-text">Profile</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/logout">
                                    <i class="fa fa-power-off"></i>
                                    <span class="menu-text">Logout</span>
                                </router-link>
                            </li>

                        </ul>
                    </div>
                    <!-- sidebar-menu  -->
                </div>
            </nav>
            <!-- sidebar-content  -->
            <main class="page-content">
                <router-view />
            </main>
        </div>
        <!-- page-wrapper -->
    </div>
</template>

<script>
    /* eslint-disable */
    import {
        fb
    } from '../firebase.js'
    export default {
        name: 'Admin',
        props: {
            msg: String
        },
        components: {

        },
        data() {
            return {
                name: null,
                email:null,
            }
        },
        created() {
            var user = fb.auth().currentUser;
            if (user != null) {
                this.email = user.email;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .page-wrapper.toggled .page-content {
      padding-left: 30px;
    }
</style>
