function getReadyToBeRemindedTasks(reminders) {
	const today = new Date();
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	const todayOnly = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);

	return reminders.filter((reminder) => {
		const { taskDueDate, reminderType, done } = reminder;
		const dueDateOnly = new Date(
			taskDueDate.getFullYear(),
			taskDueDate.getMonth(),
			taskDueDate.getDate()
		);
		const daysDifference = Math.floor(
			(dueDateOnly - todayOnly) / oneDayInMilliseconds
		);

		const validDaysDifference = {
			short: [0],
			mid: [0, 1, 2],
			long: [0, 1, 2, 7, 14, 21],
		};

		return (
			validDaysDifference[reminderType.toLowerCase()].includes(
				daysDifference
			) && !done
		);
	});
}
