import create from "zustand";
import axios from "axios";
import { SPECIAL_TYPE } from "../constants/editSpecialEffectConstants";
import { CONFIG } from "../constants/configConstants";

const [specialEffectStore] = create((set, get) => ({
  effects: [],

  effectMenu: {
    addEffect: () => {
      const effectList = get().effects;
      effectList.push({ effect_id: null }); //effect_id required for upsert
      set(() => ({
        effects: effectList,
      }));
      console.log(get().effects);
    },

    deleteEffect: (effectIndex) => {
      const effectList = get().effects;
      effectList.splice(effectIndex, 1);
      set((state) => ({
        effects: effectList,
      }));
      console.log(get().effects);
    },

    //USE INDEX OF EFFECT BEING ALTERED
    setProp(effectIndex, prop, val) {
      set((state) => ({
        effects: state.effects.map((effect, i) =>
          i === effectIndex ? { ...effect, [prop]: val } : effect
        ),
      }));
    },
    setModProp(effectIndex, modListKey, modIndex, prop, val) {
      let modList = get().effects[effectIndex][modListKey];
      modList[modIndex][prop] = val;
      set((state) => ({
        effects: state.effects.map((effect, i) =>
          i === effectIndex ? { ...effect, [modListKey]: modList } : effect
        ),
      }));
    },
    addMod(effectIndex, modListKey) {
      let modList = get().effects[effectIndex][modListKey] ?? [];
      modList.push({});
      set((state) => ({
        effects: state.effects.map((effect, i) =>
          i === effectIndex ? { ...effect, [modListKey]: modList } : effect
        ),
      }));
    },
    deleteMod(effectIndex, modListKey, modIndex) {
      let modList = get().effects[effectIndex][modListKey];
      modList.splice(modIndex, 1);
      set((state) => ({
        effects: state.effects.map((effect, i) =>
          i === effectIndex ? { ...effect, [modListKey]: modList } : effect
        ),
      }));
    },
  },

  ability: {},

  abilityMenu: {
    getAbilityById: async (specialId) => {
      const response = await axios.get(
        `${CONFIG.api.url}/ability/${specialId}`
      );
      set({ ability: response.data });
      set({ effects: response.data.effects });
      console.log(get().ability);
    },
    saveAbility: async () => {
      get().abilityMenu.setProp("effects", get().effects);
      const ability = get().ability;
      console.log(get().ability);
      await axios.patch(`${CONFIG.api.url}/ability/${ability.ability_id}`, {
        ability,
      });
      console.log("ability saved");
    },
    setProp(prop, val) {
      set((state) => ({
        ability: { ...state.ability, [prop]: val },
      }));
    },
  },
}));

export const useSpecialEffectStore = specialEffectStore;
