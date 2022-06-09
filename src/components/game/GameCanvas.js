import { useState, useRef, useEffect } from "react";
import { Sprite } from "../../data/classes/sprite";
//import { useEffectSpriteStore } from "../../data/stores/effectSpriteStore";

const GameCanvas = (props) => {
  //const effectSpriteStore = useEffectSpriteStore((state) => state);
  const canvasRef = useRef(null);
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    if (sprite) {
      const ctx = canvasRef.current.getContext("2d");
      sprite.animate(ctx);
    }
  }, [sprite]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.imageSmoothingEnabled = false;
    canvas.height = 544;
    canvas.width = 544;

    async function loadSprite() {
      const newSprite = new Sprite("", 2, 16, 18, [0, 1, 0, 2], 4);
      await newSprite.initImage();
      setSprite(newSprite);
    }
    loadSprite();
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default GameCanvas;
