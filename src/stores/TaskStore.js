import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false
    }),
    getters: {
        favs(){
            // this: refers to the tasks object
            return this.tasks.filter(item => item.isFav)
        },
        favCount(){
            return this.tasks.reduce((p, c) => c.isFav ? p +  1 : p, 0)
        },
        totalCount(){
            return this.tasks.length
        }
    },
    actions: {
        async getTasks(){
            this.isLoading = true
            const res = await fetch(import.meta.env.VITE_API_BASE_URL)
            const data = await res.json()
            this.tasks = data
            this.isLoading = false
        },
        async addTask(task){
            const findTask = this.tasks.filter(item => item.title.toLowerCase() === task.title.toLowerCase())
            if(findTask.length === 0) this.tasks.push(task)

            const res = await fetch( import.meta.env.VITE_API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-type': 'application/json'}
            })
            
            if(res.error) console.log(res.error)
        },
        async deleteTask(id){
            this.tasks = this.tasks.filter(item => item.id !== id)
        
            const res = await fetch( import.meta.env.VITE_API_BASE_URL + id, {
                method: 'DELETE',
            })
            
            if(res.error) console.log(res.error)
        
        },
        async toggleFav(id){
            const task = this.tasks.find(item => item.id === id)
            task.isFav = !task.isFav

            const res = await fetch( import.meta.env.VITE_API_BASE_URL + id, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-type': 'application/json'}
            })
            
            if(res.error) console.log(res.error)
        }
    }
})

