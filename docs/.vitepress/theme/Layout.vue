<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'
import RegisterSW from './components/RegisterSW.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <RegisterSW #layout-bottom />
  </Layout>
</template>