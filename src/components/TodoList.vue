<template>
  <h1>Hello world</h1>

  <Form @submit="addTask">

    <Field
        name="title"
        v-model="title"
        type="text"
        placeholder="Unesite naslov zadatka"
        rules="required|min:3|startsWithCapital|minWords:2"
    ></Field>
    <ErrorMessage name="title"></ErrorMessage>

    <!-- Min: 10, max: 20 (1000) -->
    <Field
        name="description"
        v-model="description"
        type="text"
        placeholder="Unesite text zadatka"
        rules="required|min:10|max:250"
    ></Field>
    <ErrorMessage name="description"></ErrorMessage>

    <Field name="dueDate" v-model="dueDate" type="date"></Field>
    <Field name="priority" as="select" v-model="priority">
      <option value="hitan">Hitan</option>
      <option value="vazan">Vazan</option>
      <option value="nijetolikovazan">Nije toliko vazan</option>
      <option value="nebitan">Nebitan</option>
    </Field>

    <Field name="board" as="select" v-model="board">
      <option value="todo">Todo</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </Field>

    <button>Snimi zadatak</button>
  </Form>

  <Form>

    <Field @change="changeSort" name="prioritySort" as="select" v-model="prioritySort">
      <option value="important">Po bitnosti</option>
      <option value="notimportant">Po nebitnosti</option>
    </Field>

  </Form>

  <div>
    <div v-for="(task, index) in tasks" :key="index">
      <p>{{ task.title }}</p>
      <p>{{ task.description }}</p>
      <p>Rok: {{ task.dueDate }}</p>
      <p>Priority: {{ task.priority }}</p>
      <button @click="deleteTask(index)">Delete task</button>
    </div>
  </div>

</template>

<script lang="ts">


import { defineComponent } from "vue";
import FormTaskType from "@/Types/FormTaskType";
import {Form, Field, ErrorMessage} from "vee-validate";
import {generateRandomId, getAllTasks, saveTask, updateAllTasks } from "@/models/tasksModel";
import TaskType from "@/Types/TaskType";
import {priorityOrder} from "@/Types/PriorityOrder";
import { isIdUsed } from "@/helpers/idHelper";

export default defineComponent({
    name: "TodoList",
    components: {
      ErrorMessage,
      Field,
      Form
    },
    data(): FormTaskType {
      return {
        id: '',
        title: '',
        description: '',
        dueDate: '',
        priority: null,
        tasks: [] as TaskType[],
        prioritySort: '',
        board: null
      }
    },

    beforeMount() {
      this.tasks = getAllTasks() ?? [];
    },

    watch: {
      tasks: {
        handler(tasks: TaskType[]): void {
          updateAllTasks(tasks);
        },
        deep: true
      },
    },

    methods: {

      changeSort() {

        const direction = this.prioritySort === 'important' ? 1 : -1;

        this.tasks.sort((a, b) => {
          const aPriority = priorityOrder[a.priority ?? 'nebitan'];
          const bPriority = priorityOrder[b.priority ?? 'nebitan'];
          return (aPriority - bPriority) * direction;
        });

      },

      addTask() {

        const taskExists = this.tasks.some(task => task.title === this.title.trim());

        if(taskExists) {
          alert("Zadatak sa ovim imenom vec postoji");
          return;
        }

        let tempId = generateRandomId();

        if(isIdUsed(tempId, this.tasks)) {
          tempId = generateRandomId();
        }

        const task = {
          id: generateRandomId(),
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          priority: this.priority,
          board: this.board,
        };

        this.tasks.push(task);

        this.resetFields();
      },

      resetFields() {
        this.title = '';
        this.description = '';
        this.dueDate = '';
        this.priority = null;
      },

      deleteTask(index: number) {
        this.tasks.splice(index, 1);
      }
    }
  });

</script>