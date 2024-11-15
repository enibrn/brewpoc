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
                :error="err"
                :error-messages="errorMessages"
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
import { ErrorUtils } from '@/utils/errors';

const props = defineProps({
  name: String
});

const dialog = ref(false);
const nameLocal = ref(props.name);
const accountStore = useMyAccountStore();
const err = ref(false);
const errorMessages = ref<string[]>([]);

const close = () => {
  dialog.value = false;

};

const save = async () => {
  err.value = false;
  errorMessages.value = [];

  if (!nameLocal.value) {
    err.value = true;
    errorMessages.value = ['Name is required'];
    return;
  }

  try {
    await accountStore.updateName(nameLocal.value);
  } catch (e) {
    err.value = true;
    errorMessages.value = [ErrorUtils.getErrorMessage(e)];
    return;
  }

  dialog.value = false;
};
</script>