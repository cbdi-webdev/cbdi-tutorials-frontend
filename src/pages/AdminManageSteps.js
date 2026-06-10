import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AdminStepCard from "../components/AdminStepCard.js";
import Spinner from "../components/Spinner.js";
import AlertContext from "../utilities/AlertContext.js";
import "../assets/css/partial-css/adminManageSteps.css";
import "../assets/css/partial-css/admin.css";

const FINANCING_TYPES = [
  "pagibigfinancing",
  "bankfinancing",
  "inhousefinancing",
];

function AdminManageSteps() {
  const [steps, setSteps] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    name: "",
    label: "",
    financingType: "pagibigfinancing",
    order: 0,
  });
  const [isCreating, setIsCreating] = useState(false);
  const { notifysuccess, notifyerror } = useContext(AlertContext);

  const token = () => localStorage.getItem("token");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [stepsRes, videosRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/steps`, {
          headers: { Authorization: `Bearer ${token()}` },
        }),
        fetch(`${process.env.REACT_APP_API_URL}/videos`, {
          headers: { Authorization: `Bearer ${token()}` },
        }),
      ]);
      const stepsData = await stepsRes.json();
      const videosData = await videosRes.json();
      setSteps(Array.isArray(stepsData) ? stepsData : []);
      setVideos(Array.isArray(videosData) ? videosData : []);
    } catch {
      notifyerror("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return notifyerror("Name is required.");
    if (!form.label.trim()) return notifyerror("Label is required.");

    setIsCreating(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/steps`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          label: form.label.trim(),
          financingType: form.financingType,
          order: Number(form.order),
        }),
      });
      if (res.ok) {
        const newStep = await res.json();
        setSteps((prev) => [...prev, newStep]);
        setForm({
          name: "",
          label: "",
          financingType: "pagibigfinancing",
          order: 0,
        });
        notifysuccess("Step created successfully.");
      } else {
        const message = await res.json();
        notifyerror(message || "Failed to create step.");
      }
    } catch {
      notifyerror("An unexpected error occurred.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (stepId, updates) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/steps/${stepId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      },
    );
    if (res.ok) {
      const updated = await res.json();
      setSteps((prev) => prev.map((s) => (s._id === stepId ? updated : s)));
      notifysuccess("Step updated.");
      return true;
    } else {
      const message = await res.json();
      notifyerror(message || "Failed to update step.");
      return false;
    }
  };

  const handleDelete = async (stepId) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/steps/${stepId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      },
    );
    if (res.ok) {
      setSteps((prev) => prev.filter((s) => s._id !== stepId));
      notifysuccess("Step deleted.");
    } else {
      const message = await res.json();
      notifyerror(message || "Failed to delete step.");
    }
  };

  const handleAddVideo = async (stepId, videoId) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/steps/${stepId}/videos/${videoId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token()}` },
      },
    );
    if (res.ok) {
      const updated = await res.json();
      setSteps((prev) => prev.map((s) => (s._id === stepId ? updated : s)));
      notifysuccess("Video added to step.");
    } else {
      const message = await res.json();
      notifyerror(message || "Failed to add video.");
    }
  };

  const handleRemoveVideo = async (stepId, videoId) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/steps/${stepId}/videos/${videoId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      },
    );
    if (res.ok) {
      const updated = await res.json();
      setSteps((prev) => prev.map((s) => (s._id === stepId ? updated : s)));
      notifysuccess("Video removed from step.");
    } else {
      const message = await res.json();
      notifyerror(message || "Failed to remove video.");
    }
  };

  const filtered =
    filter === "all" ? steps : steps.filter((s) => s.financingType === filter);
  const sorted = [...filtered].sort((a, b) => a.order - b.order);

  return (
    <div className="admin-manage-steps-container">
      <div className="admin-upflex">
        <h1 className="admin-title">Manage Steps</h1>
        <Link to="/admin">
          <span>BACK TO DASHBOARD &lt;&lt;</span>
        </Link>
      </div>

      <div className="admin-dashboard">
        <section className="step-create-section">
          <h2 className="section-heading">Create New Step</h2>
          <form onSubmit={handleCreate} className="step-create-form">
            <div className="step-form-row">
              <div className="step-form-field">
                <label>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. step-1"
                  className="step-form-input"
                />
              </div>
              <div className="step-form-field">
                <label>Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, label: e.target.value }))
                  }
                  placeholder="e.g. Introduction to Buying"
                  className="step-form-input"
                />
              </div>
              <div className="step-form-field">
                <label>Financing Type</label>
                <select
                  value={form.financingType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, financingType: e.target.value }))
                  }
                  className="step-form-select"
                >
                  {FINANCING_TYPES.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </select>
              </div>
              <div className="step-form-field step-form-field--sm">
                <label>Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, order: e.target.value }))
                  }
                  className="step-form-input"
                  min="0"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="step-create-btn"
            >
              {isCreating ? "Creating..." : "Create Step"}
            </button>
          </form>
        </section>

        <section className="step-list-section">
          <div className="step-list-header">
            <h2 className="section-heading">All Steps ({filtered.length})</h2>
            <div className="step-filter">
              <label>Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="step-form-select"
              >
                <option value="all">all</option>
                {FINANCING_TYPES.map((ft) => (
                  <option key={ft} value={ft}>
                    {ft}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="spinna-container">
              <Spinner />
            </div>
          ) : sorted.length === 0 ? (
            <p className="no-steps-msg">No steps found.</p>
          ) : (
            <div className="admin-step-list">
              {sorted.map((step) => (
                <AdminStepCard
                  key={step._id}
                  step={step}
                  allVideos={videos}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onAddVideo={handleAddVideo}
                  onRemoveVideo={handleRemoveVideo}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminManageSteps;
