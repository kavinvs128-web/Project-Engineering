import { User as UserIcon, Camera, MapPin, Globe, Calendar, BadgeCheck } from 'lucide-react'

/**
 * Profile Page.
 * Realistic private page that SHOULD be protected but isn't.
 */
function Profile() {
  const userData = {
    name: 'Demo User',
    email: 'demo@vault.app',
    memberSince: 'January 2024',
    location: 'San Francisco, CA',
    role: 'Premium Member'
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="card mb-8">
        <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-800"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end -mt-12 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                  <UserIcon className="w-12 h-12" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-1 bg-white rounded-lg shadow-md border border-slate-100 text-slate-600 hover:text-brand-600">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="ml-6 mb-2">
              <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                {userData.name}
                <BadgeCheck className="w-5 h-5 ml-2 text-brand-600 fill-brand-50" />
              </h1>
              <p className="text-slate-500 font-medium">{userData.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Contact Information</h3>
              <div className="flex items-center text-slate-600">
                <Globe className="w-4 h-4 mr-3 text-slate-400" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Calendar className="w-4 h-4 mr-3 text-slate-400" />
                <span>Joined {userData.memberSince}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Active Sessions</h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-slate-700 font-medium">Chrome on macOS (Current)</span>
                </div>
                <span className="text-slate-400">Now</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-100 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-slate-200 rounded-full mr-3"></div>
                  <span className="text-slate-700 font-medium">Safari on iPhone 15</span>
                </div>
                <span className="text-slate-400">2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
