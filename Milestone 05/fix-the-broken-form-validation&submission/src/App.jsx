// ============================================================
//  TrackFlow – Bug Report Form  (BROKEN VERSION)
//  Your task: Find and fix all the bugs in this file.
//  Do NOT modify api.js or index.css.
// ============================================================

import { useState } from 'react'
import { submitBugReport } from './api'

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low']
const COMPONENTS = ['Authentication', 'Dashboard', 'Billing', 'API', 'Notifications', 'Settings']

// ---- BUG TRACKER -----------------------------------------------
// Below are intentionally broken behaviours. Find and fix them all.
// BUG 1: Form submits even when required fields are empty
// BUG 2: No loading state — button stays active during API call
//         (users can click Submit multiple times)
// BUG 3: After successful submission the form is NOT cleared
// BUG 4: Server-side errors (from api.js) are silently swallowed
// BUG 5: No per-field validation messages are shown to the user
// BUG 6: "Steps to Reproduce" accepts any number, including 0 and negatives
// ----------------------------------------------------------------

export default function App() {
  const [form, setForm] = useState({
    title: '',
    severity: '',
    component: '',
    description: '',
    steps: '',
    stepsCount: '',
  })

  // BUG: errors state is declared but never populated or displayed
  const [errors, setErrors] = useState({})

  // BUG: loading and serverError exist but are never used in JSX
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)

  const [submitted, setSubmitted] = useState([])
  const [successId, setSuccessId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // BUG: errors are never cleared when user starts fixing a field
  }

  // BUG: validate() always returns true — no real checks happen
  const validate = () => {
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // BUG: validate() result is ignored; submission always continues
    validate()

    // BUG: loading is never set to true before the API call
    try {
      const result = await submitBugReport(form)
      setSuccessId(result.id)
      setSubmitted((prev) => [result, ...prev])
      // BUG: form state is never reset after success
    } catch (err) {
      // BUG: server error is caught but nothing is shown to the user
    } finally {
      // BUG: loading is never set back to false
    }
  }

  const sevClass = (s) =>
    ({ Critical: 'sev-critical', High: 'sev-high', Medium: 'sev-medium', Low: 'sev-low' }[s] ?? '')

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="badge">⬡ TrackFlow Internal Tools</div>
        <h1>Report a Bug</h1>
        <p>
          You're on the <strong>QA Engineering</strong> team at <strong>TrackFlow Inc.</strong> The
          team uses this form to log bugs before sprint planning every Monday. Help your teammates
          by making sure the form works correctly.
        </p>
      </header>

      <div className="card">
        <p className="section-label">New Bug Report</p>
        <form onSubmit={handleSubmit} noValidate>

          {/* SUCCESS BANNER — shown after a successful submit */}
          {successId && (
            <div style={{ background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#4caf7d' }}>
              ✓ Bug <strong>{successId}</strong> filed successfully!
            </div>
          )}

          {/* SERVER ERROR BANNER — BUG: serverError is never set, so this never shows */}
          {serverError && (
            <div style={{ background: 'rgba(247,95,95,0.1)', border: '1px solid rgba(247,95,95,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#f75f5f' }}>
              {serverError}
            </div>
          )}

          <div className="form-group">
            <label>Bug Title <span className="req">*</span></label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Checkout button unresponsive on mobile Safari"
            />
            {/* BUG: error message for title is never rendered */}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Severity <span className="req">*</span></label>
              <select name="severity" value={form.severity} onChange={handleChange}>
                <option value="">— Select —</option>
                {SEVERITIES.map((s) => <option key={s}>{s}</option>)}
              </select>
              {/* BUG: error message for severity is never rendered */}
            </div>
            <div className="form-group">
              <label>Affected Component <span className="req">*</span></label>
              <select name="component" value={form.component} onChange={handleChange}>
                <option value="">— Select —</option>
                {COMPONENTS.map((c) => <option key={c}>{c}</option>)}
              </select>
              {/* BUG: error message for component is never rendered */}
            </div>
          </div>

          <div className="form-group">
            <label>Description <span className="req">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what's happening and what the expected behaviour should be…"
            />
            {/* BUG: error message for description is never rendered */}
          </div>

          <hr className="divider" />

          <div className="form-row">
            <div className="form-group">
              <label>Steps to Reproduce</label>
              <textarea
                name="steps"
                value={form.steps}
                onChange={handleChange}
                style={{ minHeight: 72 }}
                placeholder="1. Go to…&#10;2. Click…&#10;3. Observe…"
              />
            </div>
            <div className="form-group">
              <label>No. of Steps <span className="req">*</span></label>
              <input
                type="number"
                name="stepsCount"
                value={form.stepsCount}
                onChange={handleChange}
                placeholder="e.g. 3"
              />
              {/* BUG: accepts 0, negatives, and empty — no validation */}
            </div>
          </div>

          {/* BUG: button is never disabled during loading, no spinner shown */}
          <button type="submit" className="btn btn-primary">
            Submit Bug Report
          </button>

        </form>
      </div>

      {/* Filed bugs list */}
      {submitted.length > 0 && (
        <div className="submitted-list">
          <p className="section-label" style={{ marginBottom: 8 }}>Filed This Session</p>
          {submitted.map((bug, i) => (
            <div key={i} className="submitted-item">
              <div>
                <div className="title">{bug.title}</div>
                <div className="meta">{bug.component} · {bug.stepsCount} steps</div>
              </div>
              <span className={`severity-badge ${sevClass(bug.severity)}`}>{bug.severity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
