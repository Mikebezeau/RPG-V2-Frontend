import create from "zustand";
import axios from "axios";
import { CONFIG } from "../constants/configConstants";
import { Character } from "../classes/character";

const characterStore = create((set, get) => ({
  character: {}, //editCharacter

  characterList: [],

  characterMenu: {
    getCharacterById: async (id) => {
      const response = await axios.get(`${CONFIG.api.url}/character/${id}`);
      const character = new Character(response.data);
      set({ character });
    },

    updateCharacter: async (id) => {
      console.log(get().character);
      const character = get().character;
      await axios.patch(`${CONFIG.api.url}/character/${id}`, {
        character,
      });
      console.log("character saved");
    },

    setProp(prop, val) {
      set((state) => ({
        character: { ...state.character, [prop]: val },
      }));
    },
  },
}));

export const useCharacterStore = characterStore;
