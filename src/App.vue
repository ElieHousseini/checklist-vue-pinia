<template>
    <main>
        <header>
            <img src="./assets/pinia-logo.svg" alt="pinia logo">
            <h1>Pinia Tasks</h1>
        </header>

        <!-- new task form -->
        <div class="new-task-form">
            <TaskForm />
        </div>

        <!-- filter -->
        <nav class="filter">
            <button @click="filter = 'all'">All Tasks</button>
            <button @click="filter = 'fav'">Fav Tasks</button>
        </nav>

        <div class="loading" v-if="isLoading">Loading Tasks...</div>
        <!-- task list -->
        <div class="task-list" v-if="filter === 'all' && !isLoading">
            <p>You have {{ totalCount }} tasks left to do</p>
            <div v-for="task in tasks">
                <TaskDetails :task="task" />
            </div>
        </div>
        <div class="task-list" v-if="filter === 'fav' && !isLoading">
            <p>You have {{ favCount }} favs left to do</p>
            <div v-for="task in favs">
                <TaskDetails :task="task" />
            </div>
        </div>
        <!-- <button @click="taskStore.$reset">reset</button> -->
    </main>
</template>

<script>
    import './assets/main.css'
    import { ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useTaskStore } from './stores/TaskStore'
    import TaskDetails from './components/TaskDetails.vue'
    import TaskForm from './components/TaskForm.vue'

    export default {

        components: {TaskDetails, TaskForm},
        
        setup(){
            const taskStore = useTaskStore()

            const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)

            // fetch tasks
            taskStore.getTasks()

            const filter = ref('all')
            
            console.log('taskStore', taskStore.tasks)

            return {
                taskStore, filter, tasks, isLoading, favs, totalCount, favCount 
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>