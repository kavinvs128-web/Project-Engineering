import { Bell, Shield, Key, Eye, Trash2, Smartphone } from 'lucide-react'

/**
 * Settings Page.
 * Realistic private page that SHOULD be protected but isn't.
 */
function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account security and notification preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="card">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-brand-600" />
              Security Preferences
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Two-Factor Authentication</p>
                <p className="text-sm text-slate-500">Secure your account with an extra layer of security.</p>
              </div>
              <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-all">Enable</button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Password Recovery</p>
                <p className="text-sm text-slate-500">Verify your identity with an alternative email.</p>
              </div>
              <button className="text-brand-600 font-bold text-sm hover:underline">Update</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-brand-600" />
              Notifications
            </h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-700">Login alerts for new devices</span>
              <div className="w-11 h-6 bg-brand-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Email summaries of activity</span>
              <div className="w-11 h-6 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-red-100 bg-red-50/30">
          <div className="p-6">
            <h3 className="font-bold text-red-600 flex items-center mb-2">
              <Trash2 className="w-5 h-5 mr-2" />
              Danger Zone
            </h3>
            <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-all shadow-sm shadow-red-200">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
