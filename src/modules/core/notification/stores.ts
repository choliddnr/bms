// import { defineStore } from 'pinia'
// import { ref } from 'vue'

// export interface notifType {
//   type: string
//   title: string
//   message: string
// }
// interface data extends notifType {
//   cek: string
// }

// export const useNotificationStore = defineStore('store', () => {
//   const show = ref<boolean>(false)
//   const data = ref<any[]>([])
//   const notifType = ref<object[]>([
//     {
//       name: 'success',
//       icon: 'bi-check-circle-fill',
//       header_bg: '#c0f7dd',
//       body_bg: '#c1ddd0',
//       // ['#c0f7dd','#c1ddd0']
//     },
//     {
//       name: 'info',
//       icon: 'bi-info-circle-fill',
//       header_bg: '#94ebf1',
//       body_bg: '#b9e6e9',
//       // #94ebf1, #b9e6e9
//     },
//     {
//       name: 'error',
//       icon: 'bi-x-circle-fill',
//       header_bg: '#f38080',
//       body_bg: '#f1b7b7',
//       // #f38080, #f1b7b7
//     },
//   ])

//   function setNotif(typ, title, message) {
//     show.value = true
//     data.value = notifType.value.find((item) => item.name == typ)
//     data.value.message = message
//   }

//   return { show, data, setNotif }
// })
