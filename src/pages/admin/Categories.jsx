import { useMemo, useState } from "react";
import mockCategories from "../../data/mockCategories";

import "../../styles/admin.css";

function Categories() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.active,
  ).length;

  const inactiveCategories = categories.filter(
    (category) => !category.active,
  ).length;

  const totalMemories = categories.reduce(
    (total, category) => total + Number(category.memoryCount || 0),
    0,
  );

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        category.name.toLowerCase().includes(search) ||
        category.description.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && category.active) ||
        (statusFilter === "INACTIVE" && !category.active);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const openAddModal = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name) {
      window.alert("Please enter a category name.");
      return;
    }

    if (editingCategory) {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name,
                description,
              }
            : category,
        ),
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name,
        description,
        memoryCount: 0,
        active: true,
      };

      setCategories((currentCategories) => [...currentCategories, newCategory]);
    }

    closeModal();
  };

  const toggleCategoryStatus = (categoryId) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              active: !category.active,
            }
          : category,
      ),
    );
  };

  const handleDeleteCategory = (category) => {
    if (category.memoryCount > 0) {
      window.alert(
        "This category cannot be deleted because memories are currently using it.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setCategories((currentCategories) =>
      currentCategories.filter((item) => item.id !== category.id),
    );
  };

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">LifeVault administration</p>
          <h2 className="fw-bold mb-1">Categories</h2>
          <p className="text-secondary mb-0">
            Manage the categories used to organize LifeVault memories.
          </p>
        </div>

        <div className="admin-header-actions">
          <button type="button" className="btn btn-dark" onClick={openAddModal}>
            <i className="bi bi-plus-lg me-2"></i>
            Add Category
          </button>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STATISTICS */}
      {/* -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">Total Categories</p>
                  <h3 className="fw-bold mb-1">{totalCategories}</h3>
                  <small className="text-secondary">
                    All configured categories
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-blue">
                  <i className="bi bi-grid"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">Active</p>
                  <h3 className="fw-bold mb-1">{activeCategories}</h3>
                  <small className="text-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Available for users
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-green">
                  <i className="bi bi-check-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">Inactive</p>
                  <h3 className="fw-bold mb-1">{inactiveCategories}</h3>
                  <small className="text-secondary">Currently disabled</small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-pause-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">Memories</p>
                  <h3 className="fw-bold mb-1">{totalMemories}</h3>
                  <small className="text-secondary">
                    Assigned to categories
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-images"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CATEGORY TABLE */}
      {/* -------------------------------------------------- */}

      <section>
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
              <div>
                <p className="text-secondary small mb-1">Category Management</p>
                <h3 className="h5 fw-bold mb-1">All Categories</h3>
                <p className="text-secondary small mb-0">
                  Create and manage memory organization categories.
                </p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <div className="position-relative">
                  <i
                    className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-secondary"
                    style={{
                      pointerEvents: "none",
                    }}
                  ></i>

                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Memories</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div className="admin-storage-icon">
                              <i className="bi bi-folder"></i>
                            </div>

                            <div className="fw-semibold">{category.name}</div>
                          </div>
                        </td>

                        <td>
                          <span className="text-secondary small">
                            {category.description}
                          </span>
                        </td>

                        <td>
                          <span className="fw-semibold">
                            {category.memoryCount}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              category.active
                                ? "text-bg-success"
                                : "text-bg-secondary"
                            }`}
                          >
                            {category.active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              title="Edit category"
                              onClick={() => openEditModal(category)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button
                              type="button"
                              className={`btn btn-sm ${
                                category.active
                                  ? "btn-outline-dark"
                                  : "btn-outline-success"
                              }`}
                              title={
                                category.active
                                  ? "Disable category"
                                  : "Enable category"
                              }
                              onClick={() => toggleCategoryStatus(category.id)}
                            >
                              <i
                                className={`bi ${
                                  category.active
                                    ? "bi-pause-circle"
                                    : "bi-play-circle"
                                }`}
                              ></i>
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              title="Delete category"
                              onClick={() => handleDeleteCategory(category)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <div className="text-secondary">
                          <i className="bi bi-grid fs-2 d-block mb-2"></i>
                          No categories found.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* ADD / EDIT CATEGORY MODAL */}
      {/* -------------------------------------------------- */}

      {showModal && (
        <div className="lifevault-modal-backdrop" onClick={closeModal}>
          <form
            className="lifevault-modal-dialog"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <div className="lifevault-modal-content shadow">
              <div className="modal-header lifevault-modal-header">
                <div>
                  <h5 className="modal-title fw-bold mb-1">
                    {editingCategory ? "Edit Category" : "Add Category"}
                  </h5>

                  <p className="text-secondary small mb-0">
                    {editingCategory
                      ? "Update category information."
                      : "Create a new LifeVault category."}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="lifevault-modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="categoryName"
                    className="form-label fw-semibold"
                  >
                    Category Name
                  </label>

                  <input
                    id="categoryName"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Hobbies"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength="50"
                    required
                  />
                </div>

                <div className="mb-0">
                  <label
                    htmlFor="categoryDescription"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>

                  <textarea
                    id="categoryDescription"
                    name="description"
                    className="form-control"
                    rows="4"
                    placeholder="Describe what this category is used for..."
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength="200"
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer lifevault-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-dark">
                  <i className="bi bi-check-lg me-2"></i>

                  {editingCategory ? "Save Changes" : "Add Category"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Categories;
