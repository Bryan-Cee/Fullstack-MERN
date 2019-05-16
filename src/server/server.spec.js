import { AddNewTask, UpdateTask } from "./server";

(async function testFunc() {
  await AddNewTask({
    name: "My new task",
    id: "12543"
  });

  await UpdateTask({
    id: "12543",
    name: "The new task name!!!"
  })
})();

