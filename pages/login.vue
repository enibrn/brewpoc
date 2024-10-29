<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            {{ numChanged }}
            <form @submit.prevent="attemptLogin">
              <json-forms
                :data="data"
                :schema="loginSchema"
                :uischema="uiLoginSchema"
                :renderers="renderers"
                @change="onChange"
                :validationMode="validationMode"
              />
              <v-btn
                type="submit"
                color="primary"
                class="me-4"
              >Log In</v-btn>
              <v-btn
                color="secondary"
                @click="navigateTo('/signup')"
              >Sign Up</v-btn>
            </form>
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
import { JsonForms, type JsonFormsChangeEvent } from '@jsonforms/vue';
import { useRenderers } from '@/composables/useRenderers';
import { loginSchema } from '@/schemas/userSchemas';
import { uiLoginSchema } from '@/schemas/userUiSchemas';
import { type UserLogin } from '@/types/userTypes';

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
});
useHead({
  title: 'Log In',
});

const sessionStore = useMySessionStore();
const renderers = useRenderers();
const { subscribe } = useGuestWatcher();
subscribe();

const numChanged = ref(0);

const data = ref({
  email: '',
  password: ''
} as UserLogin);

import type { ValidationMode } from '@jsonforms/core';

const validationMode = ref<ValidationMode>('ValidateAndShow');

async function attemptLogin() {
  try {
    console.log(data.value);
    await sessionStore.createByEmailPassword(
      data.value.email, data.value.password);
    console.log('Login successful');
  } catch (err) {
    console.error('Login failed', err);
  }
}

function onChange(event: JsonFormsChangeEvent) {
  //validationMode.value = 'ValidateAndShow';
  numChanged.value++;
  data.value = event.data;
}

</script>

<style>
@import '@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.css';
</style>