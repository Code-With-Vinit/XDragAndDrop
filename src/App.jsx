// App.js (Modified for Grid Layout)
import React, { useState, useRef } from "react";
import "./App.css";

// Initial data for the list
const initialItems = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const DragDropList = () => {
  const [items, setItems] = useState(initialItems);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (e, index) => {
    dragItem.current = index;

    setTimeout(() => e.target.classList.add("dragging-hidden"), 0);
  };

  const handleDragEnter = (e, index) => {
    if (dragItem.current !== index) {
      dragOverItem.current = index;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    const sourceIndex = dragItem.current;
    const targetIndex = dragOverItem.current;

    if (
      sourceIndex === null ||
      targetIndex === null ||
      sourceIndex === targetIndex
    ) {
      return;
    }

    const newItems = [...items];

    const [draggedContent] = newItems.splice(sourceIndex, 1);

    newItems.splice(targetIndex, 0, draggedContent);

    setItems(newItems);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging-hidden");
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const row1Items = items.slice(0, 5);

  const rowA = items.slice(0, 5); // Index 0 to 4
  const rowB = items.slice(5, 10); // Index 5 to 9

  const renderBlocks = (arr, startIndex) => {
    return arr.map((item, index) => {
      const globalIndex = startIndex + index;

      return (
        <div
          key={item}
          className="grid-block"
          draggable
          onDragStart={(e) => handleDragStart(e, globalIndex)}
          onDragEnter={(e) => handleDragEnter(e, globalIndex)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        >
          {item}
        </div>
      );
    });
  };

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: 0 }}>Drag & Drop Digits</h1>
      <p style={{ marginTop: 0 }}>Drag the boxes to reorder the digits 0-9.</p>
      <div className="grid-list-container">
        <div className="grid-row row-1">{renderBlocks(rowA, 0)}</div>

        <div className="grid-row row-2">{renderBlocks(rowB, 5)}</div>
      </div>
      <p className="note-text">
        Tip: Try reordering to make <span className="digits">0123456789</span>{" "}
        or reverse it!
      </p>
    </div>
  );
};

export default DragDropList;
