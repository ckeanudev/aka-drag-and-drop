import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState(DATA);

  const handleDragDrop = (results) => {
    console.log(results);
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reOrderedStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reOrderedStores.splice(sourceIndex, 1);
      reOrderedStores.splice(destinationIndex, 0, removedStore);

      return setStores(reOrderedStores);
    }
  };

  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];

      if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>

          <Droppable
            droppableId="ROOT"
            type="group"
            className=""
            direction="horizontal">
            {(provided) => (
              <div
                className="flexLayout"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    key={store.id}
                    index={index}
                    className="draggableDov">
                    {(provided) => (
                      <div
                        className="store-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}>
                        <h3>{store.name}</h3>

                        <button
                          onClick={() => {
                            console.log(`Hello ${index}`);
                          }}>
                          Click Me!
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {areArraysEqual(DATA, stores) ? (
        <button disabled>Start with me!</button>
      ) : (
        <button className="">Start with me!</button>
      )}{" "}
    </div>
  );
}

export default App;
