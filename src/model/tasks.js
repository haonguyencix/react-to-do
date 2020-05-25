class Tasks {
  constructor() {
    this.list = [];
  }

  saveToLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(this.list));
  }

  addTask = (task) => {
    this.list.push(task);
    this.saveToLocal();
  };

  findIndexTask = (taskId) => this.list.findIndex((task) => task.id === taskId);

  removeTask = (taskId) => {
    const taskIndex = this.findIndexTask(taskId);
    this.list.splice(taskIndex, 1);
    this.saveToLocal();
  };

  updateTask = (taskUpdate) => {
    const { id = '' } = taskUpdate;
    const taskIndex = this.findIndexTask(id);
    this.list[taskIndex] = taskUpdate;
    this.saveToLocal();
  };
  
  updateStatus = (taskId, status) => {
    const taskIndex = this.findIndexTask(taskId);
    this.list[taskIndex].completed = status;
    this.saveToLocal();
  };
  
  updateAllStatus = (taskIdArr, status) => {
    if(taskIdArr.length) {
      for(let id of taskIdArr) {
        const taskIndex = this.findIndexTask(id);
        this.list[taskIndex].completed = status;
      }
      this.saveToLocal();
    }
  };
}

export default new Tasks();
