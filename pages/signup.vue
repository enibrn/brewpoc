<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="attemptSignup">
              <json-forms
                :data="data"
                :schema="signupSchema"
                :uischema="uiSignupSchema"
                :renderers="renderers"
              />
              <v-btn
                type="submit"
                color="primary"
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
import { JsonForms } from '@jsonforms/vue';
import { useRenderers } from '@/composables/useRenderers';
import { signupSchema } from '@/schemas/userSchemas';
import { uiSignupSchema } from '@/schemas/userUiSchemas';
import  { type UserSignup } from '@/types/userTypes';

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
});
useHead({
  title: 'Sign Up',
});

const account = useMyAccountStore();
const renderers = useRenderers();
const { subscribe } = useGuestWatcher();
subscribe();

const data = ref({
  username: '',
  email: '',
  password: ''
} as UserSignup);

async function attemptSignup() {
  try {
    await account.createByEmailPassword(
      data.value.email,
      data.value.password,
      data.value.username,
    );
    console.log('Signup successful');
    navigateTo('/login');
  } catch (err) {
    console.error('Signup failed', err);
  }
}

</script>