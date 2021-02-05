<template>
  <div class="card">
    <div class="card-header border-0 mt-3 bg-white">
      <!-- Title Section -->
      <h3 class="font-weight-bolder d-inline-block mb-0 mt-2">Categories</h3>
      <button class="float-right btn btn-blue font-weight-bold" @click="addCategory()">
        <b-icon icon='plus'></b-icon> Add Category
      </button>
    </div>
    <div class="card-body">
      <div class="row w-100">
        <div class="col-lg-6 col-md-12 col-sm-12">
            <h3 class="font-weight-bold text-center mb-4">Active Categories</h3>
            <table class="table table-responsive-sm table-responsive-md" style="width:100%" v-if="actCategories.length != 0" >
              <thead>
                <tr>
                  <th class="text-center" style="width:10%">NO</th>
                  <th class="text-center" style="width:30%">CATEGORY</th>
                  <th class="text-center" style="width:15%">CREATED</th>
                  <th class="text-center" style="width:15%">UPDATED</th>
                  <th class="text-center" style="width:20%">ACTION</th>
                </tr>
              </thead>
              <tbody class="text-secondary" v-for="(element, index) in actCategories" :key="index">
                <tr>
                  <td class="text-center">{{index+1}}</td>
                  <td class="text-center">{{element.name}}</td>
                  <td class="text-center">{{new Date(element.created_at).toLocaleDateString()}}</td>
                  <td class="text-center">
                    {{element.updated_at ? new Date(element.updated_at).toLocaleDateString() : '-'}}</td>
                  <td class="text-center">
                    <button @click="editCategory(element)" class="btn-sm btn btn-warning mr-1 mb-1">
                      <b-icon icon="pencil"></b-icon>
                    </button>
                    <button @click="deactivate(element.id)" class="btn-sm btn btn-danger mr-1 mb-1">
                      <b-icon icon="power"></b-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="my-auto">
              <h4 class="text-center">No Active Categories</h4>
            </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
            <h3 class="font-weight-bold text-center mb-4">Deactive Categories</h3>
            <table class="table table-responsive-sm table-responsive-md" v-if="deactCategories.length > 0" style="width:100%">
              <thead>
                <tr>
                  <th class="text-center" style="width:10%">NO</th>
                  <th class="text-center" style="width:30%">NAME</th>
                  <th class="text-center" style="width:20%">CREATED</th>
                  <th class="text-center" style="width:20%">DELETED</th>
                  <th class="text-center" style="width:20%">ACTION</th>
                </tr>
              </thead>
              <tbody class="text-secondary" v-for="(element, index) in deactCategories" :key="index">
                <tr>
                  <td class="text-center">{{index+1}}</td>
                  <td class="text-center">{{element.name}}</td>
                  <td class="text-center">{{new Date(element.created_at).toLocaleDateString()}}</td>
                  <td class="text-center">
                    {{element.updated_at ? new Date(element.updated_at).toLocaleDateString() : '-'}}</td>
                  <td class="text-center">
                    <button @click="activate(element.id)" class="btn-sm btn btn-success mr-1 mb-1">
                      <b-icon icon="power"></b-icon>
                    </button>
                    <button @click="deleteCategory(element)" class="btn-sm btn btn-danger mr-1 mb-1">
                      <b-icon icon="trash"></b-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="my-auto">
              <h4 class="text-center">No Deactive Categories</h4>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { posvueMixin } from '../helper/mixin'
export default {
  name: 'Categories',
  mixins: [posvueMixin],
  data () {
    return {
      newCategory: ''
    }
  },
  computed: {
    ...mapGetters({
      actCategories: 'categories/actCategories',
      deactCategories: 'categories/deactCategories'
    })
  },
  methods: {
    ...mapActions({
      getActCtgry: 'categories/getCategories',
      getDeactCtgry: 'categories/getDeactCategories',
      addNewCtgry: 'categories/addCategories',
      deleteCtgry: 'categories/deleteCategories',
      actCtgry: 'categories/activateCategories',
      deactCtgry: 'categories/deactivateCategories',
      editCtgry: 'categories/editCategories'
    }),
    addCategory () {
      this.$swal.fire({
        title: 'Add New categories',
        input: 'text',
        confirmButtonText: 'Submit',
        showCancelButton: true,
        confirmButtonColor: '#57cad5',
        cancelButtonColor: '#f24f8a',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      }).then((result) => {
        if (result.value) {
          this.addNewCtgry(result.value)
            .then((response) => {
              if (response.code === 200) {
                this.getActCtgry()
                this.getDeactCtgry()
                this.$swal.close()
                this.alertToast('success', 'Add New Category Success')
              } else {
                this.getActCtgry()
                this.getDeactCtgry()
                this.$swal.close()
                this.alertToast('error', response.msg)
              }
            })
            .catch((err) => { console.log(err) })
        }
      })
    },
    deleteCategory (item) {
      this.$swal({
        title: 'Delete orders',
        text: `Are you sure want to delete order ${item.id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#57cad5',
        confirmButtonText: 'Confirm',
        cancelButtonColor: '#f24f8a',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.deleteCtgry(item.id)
            .then((response) => {
              if (response.code === 200) {
                this.getActCtgry()
                this.getDeactCtgry()
                this.alertToast('success', 'Delete Category Success')
              } else {
                this.alertToast('error', response.msg)
              }
            })
            .catch((err) => { console.log(err) })
        }
      })
    },
    activate (id) {
      this.actCtgry(id)
        .then((response) => {
          if (response.code === 200) {
            this.getActCtgry()
            this.getDeactCtgry()
            this.alertToast('success', 'Categories Activated')
          } else {
            this.alertToast('error', response.msg)
          }
        })
        .catch((err) => { console.log(err) })
    },
    deactivate (id) {
      this.deactCtgry(id)
        .then((response) => {
          if (response.code === 200) {
            this.getDeactCtgry()
            this.getActCtgry()
            this.alertToast('success', 'Categories Deactivated')
          } else {
            this.alertToast('error', response.msg)
          }
        })
        .catch((err) => { console.log(err) })
    },
    editCategory (item) {
      this.$swal.fire({
        title: 'Edit Categories',
        input: 'text',
        inputValue: item.name,
        inputPlaceholder: 'Categories Name',
        confirmButtonText: 'Update',
        showCancelButton: true,
        confirmButtonColor: '#57cad5',
        cancelButtonColor: '#f24f8a',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      }).then((result) => {
        if (result.value) {
          const data = {
            id: item.id,
            name: result.value
          }
          this.editCtgry(data)
            .then((response) => {
              if (response.code === 200) {
                this.getActCtgry()
                this.$swal.close()
                this.alertToast('success', 'Update Category Success')
              } else {
                this.getActCtgry()
                this.$swal.close()
                this.alertToast('error', response.msg)
              }
            })
            .catch((err) => { console.log(err) })
        }
      })
    }
  },
  mounted () {
    this.getActCtgry()
    this.getDeactCtgry()
  }
}
</script>

<style>

</style>
