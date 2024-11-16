<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="mb-2"
        color="primary"
        dark
        v-bind="props"
      >
        Update
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Update Email</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="emailLocal"
                label="Email"
                type="email"
                :error="errEmail"
                :error-messages="errorMessagesEmail"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="passwordLocal"
                label="Password"
                type="password"
                autocomplete="off"
                :error="errPassword"
                :error-messages="errorMessagesPassword"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              v-if="otherErrorMessage"
            >
              <v-label>{{ otherErrorMessage }}</v-label>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script
  setup
  lang="ts"
>
const accountStore = useMyAccountStore();

const dialog = ref(false);

const emailLocal = ref(accountStore.current?.email);
const errEmail = ref(false);
const errorMessagesEmail = ref<string[]>([]);

const passwordLocal = ref('');
const errPassword = ref(false);
const errorMessagesPassword = ref<string[]>([]);

const otherErrorMessage = ref<string | null>(null);

const close = () => {
  emailLocal.value = accountStore.current?.email;
  passwordLocal.value = '';
  resetErrors();
  dialog.value = false;
};

function resetErrors() {
  errEmail.value = false;
  errorMessagesEmail.value = [];

  errPassword.value = false;
  errorMessagesPassword.value = [];

  otherErrorMessage.value = null;
}

const save = async () => {
  resetErrors();

  let inError = false;

  if (!emailLocal.value) {
    errEmail.value = true;
    errorMessagesEmail.value = ['Email is required'];
    inError = true;
  }

  if (!passwordLocal.value) {
    errPassword.value = true;
    errorMessagesPassword.value = ['Password is required'];
    inError = true;
  }

  if (inError) {
    return;
  }

  try {
    await accountStore.updateEmail(emailLocal.value || '', passwordLocal.value || '');
  } catch (e) {
    //voglio riconoscere messaggi della forma "Invalid `email` param: Value must be a valid email address"
    otherErrorMessage.value = ErrorUtils.getErrorMessage(e);
    return;
  }

  dialog.value = false;
};
</script>
