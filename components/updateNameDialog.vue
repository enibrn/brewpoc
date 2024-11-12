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
const props = defineProps({
  name: String
});
const emit = defineEmits([
  'updateName'
]);

const dialog = ref(false);
const nameLocal = ref(props.name);

const close = () => {
  dialog.value = false;
};

const save = () => {
  dialog.value = false;
  emit('updateName', nameLocal.value);
};
</script>