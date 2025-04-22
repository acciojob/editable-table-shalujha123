import React, { useRef } from "react";

const initialData = [
  { id: 1, name: "Ram", age: 25 },
  { id: 2, name: "Shyam", age: 30 },
  { id: 3, name: "Ali", age: 35 },
  { id: 4, name: "Shaw", age: 20 },
  { id: 5, name: "Tavneet", age: 50 },
  { id: 6, name: "Lakshmi", age: 40 },
];

const App = () => {
  const inputRef = useRef({});

  function handleSave() {
    const updatedId = [];
    initialData.forEach((row) => {
      const nameRef = inputRef.current[row.id]?.name;
      const ageRef = inputRef.current[row.id]?.age;

      const currentName = nameRef?.value;
      const currentAge = ageRef?.value;

      if (currentName !== row.name || Number(currentAge) !== row.age) {
        updatedId.push(row.id);
      }
    });
    if (updatedId.length > 0) {
      console.log("Edited rows:", updatedId);
    }
  }

  return (
    <div>
      <h2>Track edited cells to log updates for future</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((row) => {
              if (!inputRef.current[row.id]) {
                inputRef.current[row.id] = {
                  name: React.createRef(),
                  age: React.createRef(),
                };
              }

              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={row.name}
                      ref={(el) => (inputRef.current[row.id].name = el)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={row.age}
                      ref={(el) => (inputRef.current[row.id].age = el)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default App;
