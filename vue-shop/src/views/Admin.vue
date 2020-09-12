<template>
<!-- eslint-disable  -->
    <div class="admin">
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <nav id="sidebar" class="sidebar-wrapper">
                <div class="sidebar-content">
                    <!-- sidebar-brand  -->
                    <div class="sidebar-item sidebar-brand">
                        <a href="#">pro sidebar</a>
                    </div>
                    <!-- sidebar-header  -->
                    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                        <div class="user-pic">
                            <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture">
                        </div>
                        <div class="user-info">
                            <span class="user-name">Jhon
                                        <strong>Smith</strong>
                                    </span>
                            <span class="user-role">Administrator</span>
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
                                <input type="text" class="form-control search-menu" placeholder="Search...">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                                <i class="fa fa-search" aria-hidden="true"></i>
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
            <!-- page-content  -->
            <main class="page-content pt-2">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Product name and price</span>
                    </div>
                    <input type="text" v-model="products.name" aria-label="First name" class="form-control">
                    <input type="text" v-model="products.price" aria-label="Last name" class="form-control">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" @click="saveData">
                                Save data
                            </button>
                </div>
                <router-view/>
            </main>
            <!-- page-content" -->
        </div>
        <!-- page-wrapper -->
    </div>
</template>

<script>
    /* eslint-disable */
    import {
        fb,
        db
    } from '../firebase.js'
    export default {
        name: 'Admin',
        props: {
            msg: String
        },
        data() {
            return {
                items: [],
                products: {
                    name: null,
                    price: null
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
