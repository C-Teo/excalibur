function processArrayOfArrays(arr) {
	const header = arr[0].map((col) => col.trim());
	const requiredOrder = [
		"Task",
		"Task Description",
		"Task Due Date",
		"Reminder Type",
		"Assignee",
		"Done?",
	];

	const headerIndexMap = {};
	header.forEach((col, index) => {
		headerIndexMap[col] = index;
	});

	const rearrangedArray = arr.map((row) => {
		return requiredOrder.map((col) => row[headerIndexMap[col] ?? 0]?.trim());
	});

	const processedArray = rearrangedArray.filter((row, index) => {
		if (index === 0) return true;

		if (row.includes(undefined) || row.includes("")) {
			return false;
		}

		const dateIndex = requiredOrder.indexOf("Task Due Date");
		const dateString = row[dateIndex];
		const dateParts = dateString.split("/").map((part) => part.trim());
		if (dateParts.length !== 3 || isNaN(new Date(dateString))) {
			return false;
		}
		row[dateIndex] = new Date(dateString);

		const doneIndex = requiredOrder.indexOf("Done?");
		const doneValue = row[doneIndex].toUpperCase().trim();

		if (doneValue !== "TRUE" && doneValue !== "FALSE") {
			return false;
		}
		row[doneIndex] = doneValue === "TRUE";

		const reminderTypeIndex = requiredOrder.indexOf("Reminder Type");
		const reminderTypeValue = row[reminderTypeIndex].toLowerCase().trim();
		if (
			reminderTypeValue !== "short" &&
			reminderTypeValue !== "mid" &&
			reminderTypeValue !== "long"
		) {
			return false;
		}
		return true;
	});

	const reminderInstances = processedArray.slice(1).map((row) => {
		return new Reminder(row[0], row[1], row[2], row[3], row[4], row[5]);
	});
	return reminderInstances;
}
