import React from "react";
import { Button } from "./Button";

export default function Question() {
  return (
    <div>
      <h3>Describe this word</h3>
      <h2>30 seconds left</h2>
      <h2>Sprechen</h2>
      <input type="text" name="description"></input>
      <Button>Submit</Button>
    </div>
  );
}
