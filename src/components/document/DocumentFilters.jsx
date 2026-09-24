function DocumentFilters({
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    folderFilter,
    setFolderFilter,
    sortOrder,
    setSortOrder,
}) {
    return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3">
                <div className="row g-2">

                    <div className="col-12 col-lg-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search files..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-2">
                        <select
                            className="form-select"
                            value={typeFilter}
                            onChange={(event) =>
                                setTypeFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="all">
                                All Types
                            </option>
                            <option value="image">
                                Images
                            </option>
                            <option value="video">
                                Videos
                            </option>
                            <option value="pdf">
                                PDFs
                            </option>
                            <option value="document">
                                Documents
                            </option>
                        </select>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <select
                            className="form-select"
                            value={folderFilter}
                            onChange={(event) =>
                                setFolderFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="all">
                                All Folders
                            </option>
                            <option value="Education">
                                Education
                            </option>
                            <option value="Certificates">
                                Certificates
                            </option>
                            <option value="Career">
                                Career
                            </option>
                            <option value="Travel">
                                Travel
                            </option>
                        </select>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(event) =>
                                setSortOrder(
                                    event.target.value
                                )
                            }
                        >
                            <option value="newest">
                                Newest First
                            </option>
                            <option value="oldest">
                                Oldest First
                            </option>
                            <option value="name">
                                Name
                            </option>
                            <option value="size">
                                Size
                            </option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DocumentFilters;