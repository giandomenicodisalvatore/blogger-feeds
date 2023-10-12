<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({ immediate: true })
})
</script>