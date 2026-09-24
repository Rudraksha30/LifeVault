export function getRecycleBinByUser(files, userId) {
  return files.filter(
    (file) => file.userId === userId && file.status === "deleted"
  );
}

export function getActiveFilesByUser(files, userId) {
  return files.filter(
    (file) => file.userId === userId && file.status === "active"
  );
}

export function moveToRecycleBin(files, fileId) {
  return files.map((file) =>
    file.id === fileId
      ? {
          ...file,
          status: "deleted",
          deletedAt: new Date().toISOString(),
        }
      : file
  );
}

export function restoreFromRecycleBin(files, fileId) {
  return files.map((file) =>
    file.id === fileId
      ? {
          ...file,
          status: "active",
          deletedAt: null,
        }
      : file
  );
}

export function permanentlyDeleteFile(files, fileId) {
  return files.filter((file) => file.id !== fileId);
}

export function emptyRecycleBin(files, userId) {
  return files.filter(
    (file) => !(file.userId === userId && file.status === "deleted")
  );
}