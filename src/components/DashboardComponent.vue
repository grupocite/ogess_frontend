<template>
    <div class="dashboard">
      <Sidebar />
      <MainContent />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Sidebar from '@/components/SidebarComponent.vue';
  import MainContent from '@/components/MainContent.vue';
  
  export default defineComponent({
    name: 'DashboardComponent',
    components: {
      Sidebar,
      MainContent,
    },
  });
  </script>
  