import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import mockDocuments from "../data/mockDocuments";
import mockRecycleBin from "../data/mockRecycleBin";
import mockMemoryFiles from "../data/mockMemoryFiles";
import {
  moveToRecycleBin,
  restoreFromRecycleBin,
  permanentlyDeleteFile,
  emptyRecycleBin,
} from "../services/recycleBinService";

const StorageContext = createContext();

const FREE_STORAGE_GB = 4;
const MAX_STORAGE_GB = 1024;

export function StorageProvider({ children }) {
  const { user } = useAuth();

  const storageKey = user
    ? `lifevault_storage_${user.id}`
    : "lifevault_storage";

  const filesKey = user ? `lifevault_files_${user.id}` : "lifevault_files";

  const warningKey = user
    ? `lifevault_storage_warning_${user.id}`
    : "lifevault_storage_warning";

  // --------------------------------------------------
  // STORAGE PURCHASE STATE
  // --------------------------------------------------

  const [totalStorageGB, setTotalStorageGB] = useState(FREE_STORAGE_GB);
  const [purchasedPlanIds, setPurchasedPlanIds] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  // Stores the warning level the user dismissed.
  // Example: "warning", "critical", "full"
  const [dismissedWarningLevel, setDismissedWarningLevel] = useState(null);

  // --------------------------------------------------
  // FILE STATE
  // --------------------------------------------------

  const [files, setFiles] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);

  // --------------------------------------------------
  // LOAD USER STORAGE + FILES
  // --------------------------------------------------

  useEffect(() => {
    if (!user) {
      setFilesLoaded(false);
      setTotalStorageGB(FREE_STORAGE_GB);
      setPurchasedPlanIds([]);
      setPurchaseHistory([]);
      setDismissedWarningLevel(null);
      setFiles([]);

      return;
    }

    try {
      // ----------------------------------------------
      // LOAD STORAGE
      // ----------------------------------------------

      const savedStorage = localStorage.getItem(storageKey);

      if (savedStorage) {
        const parsedStorage = JSON.parse(savedStorage);

        setTotalStorageGB(parsedStorage.totalStorageGB ?? FREE_STORAGE_GB);
        setPurchasedPlanIds(parsedStorage.purchasedPlanIds ?? []);
        setPurchaseHistory(parsedStorage.purchaseHistory ?? []);
      } else {
        setTotalStorageGB(FREE_STORAGE_GB);
        setPurchasedPlanIds([]);
        setPurchaseHistory([]);
      }

      // ----------------------------------------------
      // LOAD DISMISSED WARNING
      // ----------------------------------------------

      const savedWarning = localStorage.getItem(warningKey);

      if (savedWarning) {
        setDismissedWarningLevel(savedWarning);
      } else {
        setDismissedWarningLevel(null);
      }

      // ----------------------------------------------
      // LOAD FILES
      // ----------------------------------------------

      const savedFiles = localStorage.getItem(filesKey);

      if (savedFiles) {
        setFiles(JSON.parse(savedFiles));
      } else {
        const userFiles = [
          ...mockDocuments
            .filter((file) => file.userId === user.id)
            .map((file) => ({
              ...file,
              status: file.status || "active",
              deletedAt: file.deletedAt || null,
              source: "document",
            })),

          ...mockMemoryFiles
            .filter((file) => file.userId === user.id)
            .map((file) => ({
              ...file,
              status: file.status || "active",
              deletedAt: file.deletedAt || null,
              source: "memory",
            })),

          ...mockRecycleBin.filter((file) => file.userId === user.id),
        ];

        setFiles(userFiles);
      }

      setFilesLoaded(true);
      
    } catch (error) {
      console.error("Failed to load LifeVault storage data:", error);

      setFilesLoaded(false);
      setTotalStorageGB(FREE_STORAGE_GB);
      setPurchasedPlanIds([]);
      setPurchaseHistory([]);
      setDismissedWarningLevel(null);
      setFiles([]);
    }
  }, [user, storageKey, filesKey, warningKey]);

  // --------------------------------------------------
  // SAVE STORAGE STATE
  // --------------------------------------------------

  useEffect(() => {
    if (!user) return;

    const storageData = {
      totalStorageGB,
      purchasedPlanIds,
      purchaseHistory,
    };

    localStorage.setItem(storageKey, JSON.stringify(storageData));
  }, [user, storageKey, totalStorageGB, purchasedPlanIds, purchaseHistory]);

  // --------------------------------------------------
  // SAVE FILE STATE
  // --------------------------------------------------

  useEffect(() => {
  if (!user || !filesLoaded) return;

  localStorage.setItem(
    filesKey,
    JSON.stringify(files),
  );
}, [
  user,
  filesKey,
  files,
  filesLoaded,
]);

  // --------------------------------------------------
  // SAVE DISMISSED WARNING
  // --------------------------------------------------

  useEffect(() => {
    if (!user) return;

    if (dismissedWarningLevel) {
      localStorage.setItem(warningKey, dismissedWarningLevel);
    } else {
      localStorage.removeItem(warningKey);
    }
  }, [user, warningKey, dismissedWarningLevel]);

  // --------------------------------------------------
  // STORAGE PLAN FUNCTIONS
  // --------------------------------------------------

  const hasPurchasedPlan = (planId) => {
    return purchasedPlanIds.includes(planId);
  };

  const canPurchasePlan = (plan) => {
    if (!plan) return false;

    if (!plan.repeatable && hasPurchasedPlan(plan.id)) {
      return false;
    }

    return totalStorageGB + plan.storageGB <= MAX_STORAGE_GB;
  };

  const purchaseStorage = (plan) => {
    if (!plan) {
      return {
        success: false,
        message: "Invalid storage plan.",
      };
    }

    if (!plan.repeatable && hasPurchasedPlan(plan.id)) {
      return {
        success: false,
        message: "This storage pack has already been purchased.",
      };
    }

    if (totalStorageGB + plan.storageGB > MAX_STORAGE_GB) {
      return {
        success: false,
        message: "This purchase would exceed your 1 TB storage limit.",
      };
    }

    setTotalStorageGB((previousStorage) => previousStorage + plan.storageGB);

    if (!plan.repeatable) {
      setPurchasedPlanIds((previousPlans) => [...previousPlans, plan.id]);
    }

    const purchase = {
      id: Date.now(),
      planId: plan.id,
      planName: plan.name,
      storageGB: plan.storageGB,
      price: plan.price,
      purchasedAt: new Date().toISOString(),
      type: plan.type,
    };

    setPurchaseHistory((previousHistory) => [...previousHistory, purchase]);

    return {
      success: true,
      message: `${plan.name} purchased successfully.`,
    };
  };

  // --------------------------------------------------
  // STORAGE USAGE
  // --------------------------------------------------

  // File sizes are stored in MB.

  const getUsedStorageMB = (fileList = files) => {
    return fileList.reduce((total, file) => total + Number(file.size || 0), 0);
  };

  const getUsedStorageGB = (fileList = files) => {
    return getUsedStorageMB(fileList) / 1024;
  };

  const getAvailableStorageGB = () => {
    const usedGB = getUsedStorageGB();

    return Math.max(totalStorageGB - usedGB, 0);
  };

  // --------------------------------------------------
  // STORAGE WARNING STATUS
  // --------------------------------------------------

  const getStoragePercentage = () => {
    if (totalStorageGB <= 0) {
      return 100;
    }

    const usedGB = getUsedStorageGB();

    return Math.min((usedGB / totalStorageGB) * 100, 100);
  };

  const getStorageStatus = () => {
    const percentage = getStoragePercentage();

    if (percentage >= 100) {
      return {
        level: "full",
        percentage,
        message:
          "Your storage is full. Permanently delete files or purchase additional storage.",
      };
    }

    if (percentage >= 90) {
      return {
        level: "critical",
        percentage,
        message:
          "Your storage is almost full. Consider freeing some space or purchasing additional storage.",
      };
    }

    if (percentage >= 80) {
      return {
        level: "warning",
        percentage,
        message:
          "Your storage is getting full. Keep an eye on your available space.",
      };
    }

    return {
      level: "normal",
      percentage,
      message: "",
    };
  };

  // --------------------------------------------------
  // DISMISS STORAGE WARNING
  // --------------------------------------------------

  const dismissStorageWarning = (level) => {
    if (!user) return;

    if (!level || level === "normal") {
      return;
    }

    setDismissedWarningLevel(level);
  };

  // --------------------------------------------------
  // RESET WARNING WHEN STORAGE RETURNS TO NORMAL
  // --------------------------------------------------

  useEffect(() => {
    const percentage = getStoragePercentage();

    if (percentage < 80) {
      setDismissedWarningLevel(null);
    }
  }, [files, totalStorageGB]);

  // --------------------------------------------------
  // FILE UPLOAD VALIDATION
  // --------------------------------------------------

  const canAddFiles = (newFiles) => {
    if (!Array.isArray(newFiles) || newFiles.length === 0) {
      return {
        allowed: false,
        message: "No files selected.",
      };
    }

    const newFilesSizeMB = newFiles.reduce(
      (total, file) => total + Number(file.size || 0),
      0,
    );

    const newFilesSizeGB = newFilesSizeMB / 1024;
    const usedGB = getUsedStorageGB();
    const availableGB = Math.max(totalStorageGB - usedGB, 0);

    if (newFilesSizeGB > availableGB) {
      return {
        allowed: false,

        message: `Not enough storage. You have ${availableGB.toFixed(
          2,
        )} GB available, but these files require ${newFilesSizeGB.toFixed(
          2,
        )} GB.`,
      };
    }

    return {
      allowed: true,
      message: "Files can be uploaded.",
    };
  };

  // --------------------------------------------------
  // FILE FUNCTIONS
  // --------------------------------------------------

  const addFiles = (newFiles) => {
    if (!Array.isArray(newFiles) || newFiles.length === 0) {
      return {
        success: false,
        message: "No files selected.",
      };
    }

    // Check storage before changing state.
    const storageCheck = canAddFiles(newFiles);

    if (!storageCheck.allowed) {
      return {
        success: false,
        message: storageCheck.message,
      };
    }

    const preparedFiles = newFiles.map((file, index) => ({
      ...file,
      id: file.id ?? `${Date.now()}-${index}`,
      userId: user?.id,
      status: "active",
      deletedAt: null,
    }));

    setFiles((previousFiles) => [...previousFiles, ...preparedFiles]);

    return {
      success: true,
      message: "Files uploaded successfully.",
      files: preparedFiles,
    };
  };

  const deleteFile = (fileId) => {
    setFiles((previousFiles) => moveToRecycleBin(previousFiles, fileId));
  };

  const restoreFile = (fileId) => {
    setFiles((previousFiles) => restoreFromRecycleBin(previousFiles, fileId));
  };

  const permanentlyDelete = (fileId) => {
    setFiles((previousFiles) => permanentlyDeleteFile(previousFiles, fileId));
  };

  const clearRecycleBin = () => {
    if (!user) return;

    setFiles((previousFiles) => emptyRecycleBin(previousFiles, user.id));
  };

  // --------------------------------------------------
  // FILE GETTERS
  // --------------------------------------------------

  const activeFiles = files.filter(
    (file) => file.userId === user?.id && file.status !== "deleted",
  );

  const recycleBinFiles = files.filter(
    (file) => file.userId === user?.id && file.status === "deleted",
  );

  // --------------------------------------------------
  // CONTEXT VALUE
  // --------------------------------------------------

  const value = {
    storage: {
      totalGB: totalStorageGB,
      maxGB: MAX_STORAGE_GB,
      freeGB: FREE_STORAGE_GB,
      purchasedPlanIds,
      purchaseHistory,
    },

    files,
    activeFiles,
    recycleBinFiles,

    // Warning state
    dismissedWarningLevel,

    // Storage calculations
    getUsedStorageMB,
    getUsedStorageGB,
    getAvailableStorageGB,
    getStoragePercentage,
    getStorageStatus,

    // Warning
    dismissStorageWarning,

    // Upload validation
    canAddFiles,

    // Storage plans
    purchaseStorage,
    hasPurchasedPlan,
    canPurchasePlan,

    // File management
    addFiles,
    deleteFile,
    restoreFile,
    permanentlyDelete,
    clearRecycleBin,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error("useStorage must be used inside StorageProvider");
  }

  return context;
}
