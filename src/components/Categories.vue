<template>
  <div class="card">
    <div class="card-header border-0 mt-3 bg-white">
      <!-- Title Section -->
      <h3 class="font-weight-bolder d-inline-block mb-0 mt-2">Categories</h3>
      <button class="float-right btn btn-blue font-weight-bold" @click="showAddModal=true">
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
                  <td class="text-center">{{element.name}} <span class="badge btn-blue">{{element.count}}</span></td>
                  <td class="text-center">{{new Date(element.created_at).toLocaleDateString()}}</td>
                  <td class="text-center">
                    {{element.updated_at ? new Date(element.updated_at).toLocaleDateString() : '-'}}</td>
                  <td class="text-center">
                    <button @click="editCategory(element.id);showEditModal = true" class="btn-sm btn btn-warning mr-1 mb-1">
                      <b-icon icon="pencil"></b-icon>
                    </button>
                    <button @click="deleteCategory(element.id)" class="btn-sm btn btn-danger mr-1 mb-1">
                      <b-icon icon="trash"></b-icon>
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
            <table class="table table-responsive-sm table-responsive-md" v-if="deactCategories != 0" style="width:100%">
              <thead>
                <tr>
                  <th class="text-center" style="width:10%">NO</th>
                  <th class="text-center" style="width:30%">NAME</th>
                  <th class="text-center" style="width:20%">CREATED</th>
                  <th class="text-center" style="width:20%">DELETED</th>
                  <th class="text-center" style="width:20%">ACTIVATE</th>
                </tr>
              </thead>
              <tbody class="text-secondary" v-for="(element, index) in deactCategories" :key="index">
                <tr>
                  <td class="text-center">{{index+1}}</td>
                  <td class="text-center">{{element.name}} <span class="badge btn-blue">{{element.count}}</span></td>
                  <td class="text-center">{{new Date(element.created_at).toLocaleDateString()}}</td>
                  <td class="text-center">
                    {{element.updated_at ? new Date(element.updated_at).toLocaleDateString() : '-'}}</td>
                  <td class="text-center">
                    <button @click="activateCategory(element.id)" class="btn-sm btn btn-success">
                      <b-icon icon="power"></b-icon>
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
export default {
  name: 'Categories',
  computed: {
    ...mapGetters({
      actCategories: 'categories/actCategories',
      deactCategories: 'categories/deactCategories'
    })
  },
  methods: {
    ...mapActions({
      getActCtgry: 'categories/getCategories',
      getDeactCtgry: 'categories/getDeactCategories'
    })
  },
  mounted () {
    this.getActCtgry()
    this.getDeactCtgry()
  }
}
</script>

<style>

</style>
