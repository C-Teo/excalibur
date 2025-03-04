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
}

export default Reminder;
