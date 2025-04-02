<template>
  <h1>Hello world</h1>

  <Form @submit="addTask">

    <Field
        name="title"
        v-model="title"
        type="text"
        placeholder="Unesite naslov zadatka"
        rules="required|min:3|startsWithCapital|minWords:5"
    ></Field>
    <ErrorMessage name="title"></ErrorMessage>

    <!-- Min: 10, max: 20 (1000) -->
    <Field
        name="description"
        v-model="description"
        type="text"
        placeholder="Unesite text zadatka"
        rules="required|min:10|max:20"
    ></Field>
    <ErrorMessage name="description"></ErrorMessage>

    <Field name="dueDate" v-model="dueDate" type="date"></Field>
    <Field name="priority" as="select" v-model="priority">
      <option>Hitan</option>
      <option>Vazan</option>
      <option>Nije toliko vazan</option>
      <option>Nebitan</option>
    </Field>

    <button>Snimi zadatak</button>
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

export default defineComponent({
    name: "TodoList",
    components: {
      ErrorMessage,
      Field,
      Form
    },
    data(): FormTaskType {
      return {
        title: '',
        description: '',
        dueDate: '',
        priority: null,
        tasks: []
      }
    },
    methods: {

      addTask() {

        const taskExists = this.tasks.some(task => task.title === this.title.trim());

        if(taskExists) {
          alert("Zadatak sa ovim imenom vec postoji");
          return;
        }

        this.tasks.push({
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          priority: this.priority
        });

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