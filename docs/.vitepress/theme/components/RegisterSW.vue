<script setup>
import { onBeforeMount } from 'vue';

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({ immediate: true })
})
</script>