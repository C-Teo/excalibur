const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

function isShortReminderDue(dueDate, today) {
  const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  return dueDateOnly.getTime() === today.getTime();
}

function isMidReminderDue(dueDate, today) {
  const daysDifference = Math.floor((dueDate - today) / oneDayInMilliseconds);
  return isShortReminderDue(dueDate, today) || daysDifference === 1 || daysDifference === 2;
}

function isLongReminderDue(dueDate, today) {
  const daysDifference = Math.floor((dueDate - today) / oneDayInMilliseconds);
  return isMidReminderDue(dueDate, today) || daysDifference === 7 || daysDifference === 14 || daysDifference === 21;
}

export function getReadyToBeRemindedTasks(processedData) {
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const header = processedData[0];
  const dueDateIndex = header.indexOf('Task Due Date');
  const reminderTypeIndex = header.indexOf('Reminder Type');

  return processedData.filter((row, index) => {
    if (index === 0) return false; 

    const dueDate = row[dueDateIndex];
    const reminderType = row[reminderTypeIndex].toLowerCase();

    switch (reminderType) {
      case 'short':
        return isShortReminderDue(dueDate, today);
      case 'mid':
        return isMidReminderDue(dueDate, today);
      case 'long':
        return isLongReminderDue(dueDate, today);
      default:
        return false;
    }
  });
}