<template>
    <!-- eslint-disable  -->
    <div>
            <!-- page content -->
            <div class="page-content">
                <h3 class="d-inline-block">Product List</h3>
                <button @click="addNew"
                        class="btn btn-primary float-right">Add product</button>
                <table class="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Modify</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products">
                            <td>
                                {{ product.name }}
                            </td>
                            <td>
                                {{ product.price }}
                            </td>
                            <td>
                                <button @click="editProduct(product)"
                                        class="btn btn-primary">Edit</button>
                                <button @click="deleteProduct(product)"
                                        class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Modal -->
            <div class="modal fade"
                 id="myModal"
                 data-backdrop="static"
                 data-keyboard="false"
                 tabindex="-1"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"
                                id="staticBackdropLabel">Edit Product</h5>
                            <button type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-3">
                                <input type="text"
                                       class="form-control"
                                       v-model="product.name"
                                       placeholder="Product Name"
                                       aria-label="Product Name"
                                       aria-describedby="basic-addon1">
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Product description</span>
                                </div>
                                <vue-editor v-model="product.description"></vue-editor>
                            </div>
                            <h5 class="modal-title"
                                style="margin-bottom:12px; margin-top:12px"
                                id="staticBackdropLabel">Product Detail</h5>
                            <div class="input-group mb-3">
                                <input type="text"
                                       class="form-control"
                                       v-model="product.price"
                                       placeholder="Product price"
                                       aria-label="Product price"
                                       aria-describedby="basic-addon2">
                            </div>
                            <div class="input-group mb-3">
                                <input @keyup.32="addTag"
                                       type="text"
                                       placeholder="Product tags"
                                       v-model="tag"
                                       class="form-control"
                                       id="basic-url"
                                       aria-describedby="basic-addon3">
                            </div>
                            <div class="tag d-inline-block"
                                 v-for="tag in product.tags">
                                <span>
                                    {{ tag }}
                                </span>
                            </div>
                            <div class="input-group">
                                <div class="custom-file">
                                    <input type="file"
                                           @change="updateImage"
                                           class="custom-file-input"
                                           id="inputGroupFile04"
                                           aria-describedby="inputGroupFileAddon04">
                                    <label class="custom-file-label"
                                           for="inputGroupFile04">Choose file</label>
                                </div>
                            </div>
                            <div class="p-1 d-inline-block" style="position: relative"
                                 v-for="(image,index) in product.images">
                                <img :src="image"
                                     width="80px"
                                     height="80px">
                                <div @click="deleteImage(image,index)"  class="del-img">X</div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal">Close</button>
                            <button @click="saveNewProduct"
                                    v-if="editMode == 'new'"
                                    type="button"
                                    class="btn btn-primary">Save product</button>
                            <button @click="updateProductInfo"
                                    v-if="editMode == 'edit'"
                                    type="button"
                                    class="btn btn-primary">Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->
    </div>
</template>

<script>
    /* eslint-disable */
    import {
        fb,
        db
    } from '../firebase.js'
    import { VueEditor } from "vue2-editor";
    export default {
        name: 'Products',
        props: {
            msg: String
        },
        components: {
            VueEditor
        },
        data() {
            return {
                products: [],
                product: {
                    name: null,
                    price: null,
                    description: null,
                    tags: [],
                    images: []
                },
                tag: null,
                editMode: null,
            }
        },
        firestore() {
            return {
                products: db.collection("products")
            }
        },
        methods: {
            deleteImage(image, index) {
                var img = fb.storage().refFromURL(image);
                this.product.images.splice(index, 1);
                // Delete the file
                img.delete().then(function () {
                    console.log('File deleted successfully')
                }).catch(function (error) {
                    console.log('Uh-oh, an error occurred!')
                });
            },
            updateImage(e) {
                if (e.target.files[0]) {
                    let file = e.target.files[0]
                    var storageRef = fb.storage().ref('products/' + file.name);
                    var uploadTask = storageRef.put(file)

                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on('state_changed', // or 'state_changed'
                        (snapshot) => {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused': // or 'paused'
                                    console.log('Upload is paused');
                                    break;
                                case 'running': // or 'running'
                                    console.log('Upload is running');
                                    break;
                            }
                        }, (error) => {

                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;

                                case 'storage/canceled':
                                    // User canceled the upload
                                    break;
                                case 'storage/unknown':
                                    // Unknown error occurred, inspect error.serverResponse
                                    break;
                            }
                        }, () => {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                this.product.images.push(downloadURL)
                                console.log('File available at', downloadURL);
                            });
                        });
                }

                // console.log(e.target.files[0])
            },
            addTag() {
                this.product.tags.push(this.tag)
                this.tag = ""
            },
            reset() {
                this.product = {
                    name: null,
                    price: null,
                    description: null,
                    tags: [],
                    images: []
                }
            },
            addNew() {
                this.editMode = 'new';
                console.log(this.editMode)
                this.reset()
                $('#myModal').modal('show')
            },
            editProduct(product) {
                this.editMode = 'edit';
                console.log(this.editMode)
                console.log(product)
                this.product = product
                $('#myModal').modal('show')
            },
            updateProductInfo() {
                console.log(this.product)
                this.$firestore.products.doc(this.product.id).update(this.product)
                $('#myModal').modal('hide')
                Toast.fire({
                    icon: 'success',
                    title: 'Updated successfully'
                })
            },
            deleteProduct(item) {
                this.product = item
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(item)
                        this.$firestore.products.doc(this.product.id).delete()
                        Toast.fire({
                            icon: 'success',
                            title: 'Deleted successfully'
                        })
                    }
                })
            },
            saveNewProduct() {
                this.$firestore.products.add(this.product)
                $('#myModal').modal('hide')
                Toast.fire({
                    icon: 'success',
                    title: 'Added successfully'
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    // .page-content {
    //     padding-left: 140px;    }
    .del-img {
      position: absolute;
      top: -6px;
      left: -4px;
      font-weight: bold;
      color: red;
      cursor: pointer;
    }
    .tag {
      background-color: rgb(203, 209, 216);
      padding: 10px;
      line-height: 9px;
      border-color: white;
      border-width: 3px;
      border-style: solid;
      font-size: 2em;
      margin-bottom: 10px;
      color: white;
    }
    .tag span {
      color: black;
      font-style: italic;
      font-size: 20px;
    }
</style>
