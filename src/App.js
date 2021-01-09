import "./App.css";
import { useState } from "react";

const initList = [1, 2, 3, 4, 5, 6];

function App() {
  const [list, setList] = useState(initList);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDrag = (e, index) => {
    // When we start dragging we need to remember the item we are dragging.
    // So we create a state for it.
    setDraggedItem(list[index]);

    // To make our drags look smoother
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const handleDragOver = (index) => {
    const draggedOverItem = list[index];
    // Checking whether the draggedItem is the same as the item beign dragged.
    if (draggedItem === draggedOverItem) return;

    // Filtering the list to get the dragged item
    const items = list.filter((i) => i !== draggedItem);

    // Inserting the dragged item into the index we are dragging over.
    items.splice(index, 0, draggedItem);
    setList(items)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Drag and Drop Project using React Hooks</h3>
        {list.map((listo, index) => (
          <ul key={index}>
            <li
              onDragOver={() => handleDragOver(index)}
              className="item-style"
            >
              {/* The item is intentionally put in a div to make it draggable */}
              <div draggable onDragStart={(e) => handleDrag(e, index)}>
                {listo}
              </div>
            </li>
          </ul>
        ))}
      </header>
    </div>
  );
}

export default App;
