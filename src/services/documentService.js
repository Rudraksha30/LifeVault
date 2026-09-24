import mockDocuments from "../data/mockDocuments";

export function getDocumentsByUser(userId) {
    return mockDocuments.filter(
        (document) =>
            document.userId === userId
    );
}

export function searchDocuments(
    documents,
    searchTerm
) {
    const term =
        searchTerm.trim().toLowerCase();

    if (!term) {
        return documents;
    }

    return documents.filter(
        (document) =>
            document.name
                .toLowerCase()
                .includes(term) ||
            document.folder
                .toLowerCase()
                .includes(term)
    );
}

export function getDocumentType(
    file
) {
    if (file.type.startsWith("image/")) {
        return "image";
    }

    if (file.type.startsWith("video/")) {
        return "video";
    }

    if (
        file.type === "application/pdf"
    ) {
        return "pdf";
    }

    return "document";
}