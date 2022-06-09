import { Routes, Route } from "react-router-dom";

import AbilityList from "./ability/AbilityList";
import EditAbility from "./ability/EditAbility";

import EditCharacter from "./character/EditCharacter";
import EditClass from "./class/EditClass";
import FeatList from "./feat/FeatList";

import ItemList from "./item/ItemList";
import AddItem from "./item/AddItem";
import EditItem from "./item/EditItem";

import TraitList from "./trait/TraitList";

function EditMenu() {
  return (
    <Routes>
      <Route path="ability" element={<AbilityList />} />
      <Route path="ability/:id" element={<EditAbility />} />
      <Route path="character/:id" element={<EditCharacter />} />
      <Route path="class/:id" element={<EditClass />} />
      <Route path="feat" element={<FeatList />} />
      <Route path="item" element={<ItemList />} />
      <Route path="item/add" element={<AddItem />} />
      <Route path="item/:id" element={<EditItem />} />
      <Route path="trait" element={<TraitList />} />
    </Routes>
  );
}
export default EditMenu;
