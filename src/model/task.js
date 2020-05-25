class Task {
  constructor(id = "", content = "", completed = false) {
    this.id = id;
    this.content = content;
    this.completed = completed;
  }
}

export default new Task();
