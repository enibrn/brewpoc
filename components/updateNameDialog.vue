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
        <span class="text-h5">Update name</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="nameLocal"
                label="Name"
                :error="errName"
                :error-messages="errMessagesName"
              ></v-text-field>
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
  lang="ts"
  setup
>
const accountStore = useMyAccountStore();

const dialog = ref(false);

const nameLocal = ref(accountStore.current?.name);
const errName = ref(false);
const errMessagesName = ref<string[]>([]);

const close = () => {
  nameLocal.value = accountStore.current?.name;
  resetErrors();
  dialog.value = false;
};

function resetErrors() {
  errName.value = false;
  errMessagesName.value = [];
}

const save = async () => {
  resetErrors();

  if (!nameLocal.value) {
    errName.value = true;
    errMessagesName.value = ['Name is required'];
    return;
  }

  try {
    await accountStore.updateName(nameLocal.value);
  } catch (e) {
    errName.value = true;
    errMessagesName.value = [ErrorUtils.getErrorMessage(e)];
    return;
  }

  dialog.value = false;
};
</script>