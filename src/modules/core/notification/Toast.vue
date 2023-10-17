<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
const { Toast } = window.bootstrap

export interface NotifType {
  type: string
  title: string
  message: string
}
interface Props extends NotifType {
  modelValue: boolean
}
interface ToastConf {
  name: string
  icon: string
  header_bg: string
  body_bg: string
}
const emit = defineEmits(['update:modelValue'])

const props = defineProps<Props>()
const toastRef = ref<Element>()
const toastConfOptions = ref<ToastConf[]>([
  {
    name: 'success',
    icon: 'bi-check-circle-fill',
    header_bg: '#c0f7dd',
    body_bg: '#c1ddd0',
    // ['#c0f7dd','#c1ddd0']
  },
  {
    name: 'info',
    icon: 'bi-info-circle-fill',
    header_bg: '#94ebf1',
    body_bg: '#b9e6e9',
    // #94ebf1, #b9e6e9
  },
  {
    name: 'error',
    icon: 'bi-x-circle-fill',
    header_bg: '#f38080',
    body_bg: '#f1b7b7',
    // #f38080, #f1b7b7
  },
])

const toastConf = toastConfOptions.value.find((item) => item.name == props.type)
onMounted(() => {
  const toastBootstrap = new Toast(toastRef.value!)
  toastBootstrap.show()
  toastRef.value?.addEventListener('hidden.bs.toast', () => {
    emit('update:modelValue', false)
  })
})
</script>

<template>
  <div class="container">
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref="toastRef"
      >
        <div class="toast-header" :style="{ 'background-color': toastConf?.header_bg }">
          <i class="bi" :class="toastConf?.icon"></i>
          <strong class="me-auto ms-1"> {{ toastConf?.name }}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body" :style="{ 'background-color': toastConf?.body_bg }">
          {{ props.message }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');
</style>
