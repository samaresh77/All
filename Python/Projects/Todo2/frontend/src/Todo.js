import { useEffect, useState } from "react";
import API from "./api";

export default function Todo() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(t => (
        <div key={t.id}>
          <b>{t.title}</b> | {t.priority} | {t.due_date}
        </div>
      ))}
    </div>
  );
}
