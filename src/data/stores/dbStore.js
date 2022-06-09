import create from "zustand";
import axios from "axios";
import { CONFIG } from "../constants/configConstants";

const [dbStore] = create((set, get) => ({
  ancestryList: [],
  backgroundList: [],
  heritageList: [],
  classList: [],
  featList: [],
  traitList: [],
  skillList: [],
  fetchGameData: async () => {
    //GAME DATA
    const responseAncestry = await axios.get(
      `${CONFIG.api.url}/gameData/ancestry`
    );
    set({ ancestryList: await responseAncestry.data });

    const responseBackground = await axios.get(
      `${CONFIG.api.url}/gameData/background`
    );
    set({ backgroundList: await responseBackground.data });

    const responseHeritage = await axios.get(
      `${CONFIG.api.url}/gameData/heritage`
    );
    set({ heritageList: await responseHeritage.data });

    const responseSkill = await axios.get(`${CONFIG.api.url}/gameData/skill`);
    set({ skillList: await responseSkill.data });

    const responseClass = await axios.get(
      `${CONFIG.api.url}/gameData/charClass`
    );
    set({ classList: await responseClass.data });

    const responseTrait = await axios.get(`${CONFIG.api.url}/gameData/trait`);
    set({ traitList: await responseTrait.data });

    const responseFeat = await axios.get(`${CONFIG.api.url}/feat`);
    set({ featList: await responseFeat.data });
  },
}));

export const useDbStore = dbStore;
