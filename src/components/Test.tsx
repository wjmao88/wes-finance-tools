import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { createAutoAnimate } from "@formkit/auto-animate/solid";

const [store, setStore] = createStore({
  data: [{ v: "1" }, { v: "2" }, { v: "3" }, { v: "4" }],
});

const doShuffle = () => {
  console.log("555");
  setStore(
    produce((store) => {
      console.log("???");
      const [item] = store.data.splice(0, 1);
      store.data = store.data.toSpliced(1, 0, item);
    })
  );
};

export default function Test() {
  const [parent] = createAutoAnimate(/* optional config */);
  return (
    <main>
      <h1>About</h1>
      <button onClick={() => doShuffle()}>shuffle11</button>
      <div class="flex gap-4 m-3" ref={parent}>
        <For each={store.data}>{(d, i) => <div>{i()}</div>}</For>
      </div>
    </main>
  );
}
