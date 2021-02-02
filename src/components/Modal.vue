<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper ">
        <div class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-10 modal-content bg-white">
          <div class="modal-header w-100 pb-0" style="border:none">
            <slot name="header" class="w-100 ">
              Add Item
            </slot>
          </div>
          <div class="modal-body p-0">
            <slot name="body">
              default body
            </slot>
          </div>
          <div class="p-2 mb-4" style="border:none">
            <slot name="footer">
              default footer
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'modal'
}