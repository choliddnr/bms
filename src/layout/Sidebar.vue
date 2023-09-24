<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { onMounted, ref, watch, computed } from 'vue'
import { isDesktop } from '@/modules/core/utils/isDesktop'
import { setTheme } from '@/modules/core/utils/initTheme'

import PerfectScrollbar from 'perfect-scrollbar'

const props = defineProps<{
  isDesktop: boolean
  showSidebar: boolean
}>()
const emit = defineEmits(['update:showSidebar'])

// const sidebarMini = ref(false)
const calculateChildrenHeight = (el: HTMLElement | null): number | null => {
  if (!el) return null
  const children: HTMLCollection = el.children
  let height: number = 0
  for (let i = 0; i < el.childElementCount; i++) {
    const child: Element | null = children[i].querySelector('.submenu-link')
    if (child) {
      height += child.clientHeight
    }
  }
  el.style.setProperty('--submenu-height', height + 'px')
  return height
}

/**
 * Calculate nested children height in sidebar menu
 *
 * @param {HTMLElement} el
 */

class Sidebar {
  sidebarEL: Element | null
  options: object

  constructor(el: HTMLElement, options: object = {}) {
    this.sidebarEL = el instanceof HTMLElement ? el : document.querySelector(el)
    this.options = options
    this.init()
  }

  /**
   * initialize the sidebar
   */
  init() {
    // add event listener to sidebar
    document
      .querySelectorAll('#toggleSidebar')
      .forEach((el) => el.addEventListener('click', this.toggle.bind(this)))
    document
      .querySelectorAll('.sidebar-hide')
      .forEach((el) => el.addEventListener('click', this.toggle.bind(this)))
    window.addEventListener('resize', this.onResize.bind(this))

    // Perfect Scrollbar Init
    if (typeof PerfectScrollbar == 'function') {
      const container = document.querySelector('.sidebar-wrapper')
      if (container) {
        const ps = new PerfectScrollbar(container, {
          wheelPropagation: false,
        })
      }
    }

    // Scroll into active sidebar
    setTimeout(() => {
      const sidebarItemActive: HTMLElement | null = document.querySelector('.sidebar-item.active')
      if (sidebarItemActive) this.forceElementVisibility(sidebarItemActive)
    }, 300)
  }

  /**
   * On Sidebar Rezise Event
   */
  onResize() {
    if (isDesktop()) {
      this.sidebarEL!.classList.add('active')
    } else {
      this.sidebarEL!.classList.remove('active')
    }

    // reset
    this.deleteBackdrop()
    this.toggleOverflowBody(true)
  }

  /**
   * Toggle Sidebar
   */
  toggle() {
    const sidebarState = this.sidebarEL!.classList.contains('active')
    if (sidebarState) {
      this.hide()
    } else {
      this.show()
    }
  }

  /**
   * Show Sidebar
   */
  show() {
    this.sidebarEL!.classList.add('active')
    this.sidebarEL!.classList.remove('inactive')
    this.createBackdrop()
    this.toggleOverflowBody()
  }

  /**
   * Hide Sidebar
   */
  hide() {
    this.sidebarEL!.classList.remove('active')
    this.sidebarEL!.classList.add('inactive')
    this.deleteBackdrop()
    this.toggleOverflowBody()
  }

  /**
   * Create Sidebar Backdrop
   */
  createBackdrop() {
    if (isDesktop()) return
    this.deleteBackdrop()
    const backdrop = document.createElement('div')
    backdrop.classList.add('sidebar-backdrop')
    backdrop.addEventListener('click', this.hide.bind(this))
    document.body.appendChild(backdrop)
  }

  /**
   * Delete Sidebar Backdrop
   */
  deleteBackdrop() {
    const backdrop = document.querySelector('.sidebar-backdrop')
    if (backdrop) {
      backdrop.remove()
    }
  }

  /**
   * Toggle Overflow Body
   */
  toggleOverflowBody(active: boolean = true) {
    if (isDesktop()) return
    const sidebarState = this.sidebarEL!.classList.contains('active')
    const body = document.querySelector('body')
    if (typeof active == 'undefined') {
      body!.style.overflowY = sidebarState ? 'hidden' : 'auto'
    } else {
      body!.style.overflowY = active ? 'auto' : 'hidden'
    }
  }

  isElementInViewport(el: HTMLElement) {
    var rect = el.getBoundingClientRect()

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  forceElementVisibility(el: HTMLElement) {
    if (!this.isElementInViewport(el)) {
      el.scrollIntoView(false)
    }
  }
}

/**
 * On First Load
 */

const onFirstLoad = (sidebarEl: HTMLElement) => {
  if (!sidebarEl) return
  if (isDesktop()) {
    emit('update:showSidebar', true)
  }

  // Get submenus size
  let submenus = document.querySelectorAll('.sidebar-item.has-sub .submenu')
  for (var i = 0; i < submenus.length; i++) {
    let submenu = submenus[i] as HTMLElement
    const sidebarItem = submenu.parentElement
    const height = submenu.clientHeight

    if (sidebarItem!.classList.contains('active')) submenu.classList.add('submenu-open')
    else submenu.classList.add('submenu-closed')
    setTimeout(() => {
      const height = calculateChildrenHeight(submenu)
    }, 50)
  }
}

if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light')
const localTheme = localStorage.getItem('theme') as string
// console.log(localTheme)
const theme = ref<string>(localTheme)
let isDArk = ref<boolean>(theme.value === 'dark')
const changeTheme = () => {
  theme.value = isDArk.value ? 'dark' : 'light'
  setTheme(theme.value)
  localStorage.setItem('theme', theme.value)
}

const router = useRouter()

onMounted(() => {
  let sidebarEl = document.getElementById('sidebar')
  if (document.readyState !== 'loading') {
    onFirstLoad(sidebarEl!)
  } else {
    console.log('onFirstLoad event listener func call')
  }
  /**
   * Create Sidebar Wrapper
   */
  if (sidebarEl) {
    new Sidebar(sidebarEl)
  }
  setTheme(theme.value)
})
</script>

<template>
  <div class="sidebar-wrapper active">
    <div class="sidebar-header position-relative">
      <div class="d-flex justify-content-between align-items-center">
        <div class="logo">
          <a href="index.html"><img src="@/assets/images/logo/logo.svg" alt="Logo" srcset="" /></a>
        </div>
        <br />
        <div class="theme-toggle d-flex gap-2 align-items-center mt-2 justify-content-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--system-uicons"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 21 21"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2"
                opacity=".3"
              ></path>
              <g transform="translate(-210 -1)">
                <path d="M220.5 2.5v2m6.5.5l-1.5 1.5"></path>
                <circle cx="220.5" cy="11.5" r="4"></circle>
                <path
                  d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2"
                ></path>
              </g>
            </g>
          </svg>
          <div class="form-check form-switch fs-6">
            <input
              class="form-check-input me-0"
              type="checkbox"
              id="toggle-dark"
              style="cursor: pointer"
              @change="changeTheme"
              v-model="isDArk"
            />
            <label class="form-check-label"></label>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--mdi"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z"
            ></path>
          </svg>
        </div>
        <div class="sidebar-toggler x">
          <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
        </div>
      </div>
    </div>
    <div class="sidebar-menu" id="x">
      <ul class="menu p-0 ps-3">
        <li class="sidebar-title">Menus</li>

        <RouterLink
          v-for="r in router.getRoutes().filter((r) => Object.keys(r.meta).length > 0)"
          :to="r.path"
          v-slot="{ href, navigate, isActive }"
        >
          <li
            :class="{ active: isActive, 'has-sub': r.children.length > 0 }"
            class="sidebar-item pe-3"
          >
            <a :href="href" @click="navigate" class="sidebar-link"
              ><i class="bi" :class="r.meta.icon"></i><span>{{ r.name }}</span></a
            >
            <ul class="submenu" v-if="r.children.length > 0">
              <RouterLink
                v-for="c in r.children"
                :to="r.path + '/' + c.path"
                v-slot="{ href, navigate }"
              >
                <li class="submenu-item">
                  <a :href="r.path + href" @click="navigate" class="submenu-link">{{ c.name }}</a>
                </li>
              </RouterLink>
            </ul>
          </li>
        </RouterLink>

        <!-- <li class="sidebar-title">Raise Support</li> -->
      </ul>
    </div>
  </div>
</template>
<!-- ../isDesktop../modules/core/isDesktop -->
