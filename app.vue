<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script
  setup
  lang="ts"
>
const sessionStore = useMySessionStore();

const { execute } = useAsyncData('session-init', () => sessionStore.init(), {
  immediate: false,
});

onMounted(() => execute());
</script>