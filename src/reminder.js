class Reminder {
	constructor(
		task,
		taskDescription,
		taskDueDate,
		reminderType,
		assignee,
		done
	) {
		this.task = task;
		this.taskDescription = taskDescription;
		this.taskDueDate = taskDueDate;
		this.reminderType = reminderType;
		this.assignee = assignee;
		this.done = done;
	}

	getFormattedDueDate() {
		return this.taskDueDate.toLocaleDateString();
	}

	isDone() {
		return this.done;
	}

	toString() {
		return `Task: ${this.task}, Description: ${
			this.taskDescription
		}, Due Date: ${this.getFormattedDueDate()}, Reminder Type: ${
			this.reminderType
		}, Assignee: ${this.assignee}, Done: ${this.done}`;
	}
}

export default Reminder;
