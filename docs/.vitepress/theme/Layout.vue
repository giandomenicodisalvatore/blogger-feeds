<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'
import RegisterSW from './components/RegisterSW.vue'
import './style.css'
import 'uno.css'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <RegisterSW #layout-bottom />
  </Layout>
</template>