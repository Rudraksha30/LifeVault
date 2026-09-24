export function calculateUsedStorage(documents) {
  return documents.reduce(
    (total, document) => total + Number(document.size || 0),
    0,
  );
}

export function calculateUsedStorageGB(documents) {
  const usedMB = calculateUsedStorage(documents);

  return usedMB / 1024;
}

export function calculateStoragePercentage(usedGB, totalGB) {
  if (totalGB <= 0) {
    return 0;
  }

  return Math.min((usedGB / totalGB) * 100, 100);
}

export function getRemainingStorage(usedGB, totalGB) {
  return Math.max(totalGB - usedGB, 0);
}

export function canAddStorage(currentStorageGB, additionalStorageGB) {
  return currentStorageGB + additionalStorageGB <= 1024;
}
