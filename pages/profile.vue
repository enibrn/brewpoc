<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Profile</span>
          </v-card-title>
          <v-card-text>
            <!-- <json-forms
              :data="data"
              :schema="profileSchema"
              :uischema="uiProfileSchema"
              :renderers="renderers"
            /> -->
            account:
            <pre><code>{{ account }}</code></pre><br>
            sessionStore:
            <pre><code>{{ sessionStore }}</code></pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  lang="ts"
  setup
>
import { JsonForms } from '@jsonforms/vue';
import { useRenderers } from '@/composables/useRenderers';
import { profileSchema } from '@/schemas/userSchemas';
import { uiProfileSchema } from '@/schemas/userUiSchemas';
import { type UserProfile } from '@/types/userTypes';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'Profile',
});

const account = useMyAccountStore();
const sessionStore = useMySessionStore();

const data = ref({
  username: '',
  email: ''
} as UserProfile);

</script>
