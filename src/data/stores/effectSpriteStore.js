import create from "zustand";
import { Sprite } from "../classes/sprite";

const [effectSpriteStore] = create((set, get) => ({
  effectSprite: null,
  initEffectSprite: async () => {
    const newSprite = new Sprite();
    await newSprite.initImage();
    set({ effectSprite: newSprite });
  },
}));

export const useEffectSpriteStore = effectSpriteStore;
