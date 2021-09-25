import React from "react";
import { Button } from "./Button";

export default function Question() {
  return (
    <div className="shadow-lg rounded-xl bg-blue-400 p-8">
      <h2>30 seconds left</h2>
      <h3>How would you describe the following word?</h3>
      <h2>Sprechen</h2>
      <input type="text" name="description" className="w-full"></input>
      <Button>Submit</Button>
    </div>
  );
}
