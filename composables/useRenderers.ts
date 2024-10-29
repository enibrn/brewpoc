import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify';

export const useRenderers = () => {
  const renderers = markRaw([
    ...extendedVuetifyRenderers,
    // here you can add custom renderers
  ]);

  return Object.freeze(renderers);
};