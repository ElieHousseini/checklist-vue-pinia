<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <font-awesome-icon :icon="['fas', 'trash-alt']" @click="taskStore.deleteTask(task.id)" class="icon-trash" />
            <font-awesome-icon :class="{isFav: task.isFav}" :icon="['fas', 'heart']" @click="taskStore.toggleFav(task.id)" class="icon-heart" />
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore';

    export default {
            props: [
                'task'
            ],
            setup(){
                const taskStore = useTaskStore()

                return { taskStore }
            }
    }
</script>