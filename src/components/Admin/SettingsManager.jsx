import React, { useEffect, useState } from 'react';
import { Lock, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { changePassword, getMe, updateAdminProfile } from '../../api/auth.api.js';
import ImageUploader from './ImageUploader.jsx';

const DEFAULTS = {
  displayName: 'WOWPIO Admin',
  roleLabel: 'Site owner',
  avatarUrl: '',
};

export default function SettingsManager({ onProfileUpdate }) {
  const [profile, setProfile] = useState(DEFAULTS);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setProfile({
          displayName: me.displayName || DEFAULTS.displayName,
          roleLabel: me.roleLabel || DEFAULTS.roleLabel,
          avatarUrl: me.avatarUrl || '',
        });
      } catch (e) {
        console.error(e);
      } finally {
        setProfileLoading(false);
      }
    })();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      setProfileSaving(true);
      const updated = await updateAdminProfile({
        displayName: profile.displayName.trim() || DEFAULTS.displayName,
        roleLabel: profile.roleLabel.trim() || DEFAULTS.roleLabel,
        avatarUrl: profile.avatarUrl || '',
      });
      const next = {
        displayName: updated.displayName || DEFAULTS.displayName,
        roleLabel: updated.roleLabel || DEFAULTS.roleLabel,
        avatarUrl: updated.avatarUrl || '',
      };
      setProfile(next);
      onProfileUpdate?.(next);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccessMsg('Password successfully updated!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Failed to change password', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const initials = (profile.displayName || 'WP')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      {errorMsg && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
          <CheckCircle2 className="h-5 w-5" />
          <p>{successMsg}</p>
        </div>
      )}

      {/* Profile */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-white">Profile</h2>
        <p className="mt-1 text-sm text-white/50">
          Update admin name and icon. Defaults stay as WOWPIO Admin / WP until you change them.
        </p>

        <form
          onSubmit={handleProfileSave}
          className="mt-5 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8"
        >
          {profileLoading ? (
            <p className="text-sm text-white/40">Loading profile…</p>
          ) : (
            <>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#121212] p-4">
                {profile.avatarUrl ? (
                  <img
                    src={
                      profile.avatarUrl.startsWith('http')
                        ? profile.avatarUrl
                        : `http://localhost:5000${profile.avatarUrl}`
                    }
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A259] to-[#1E4D6B] text-sm font-bold text-white">
                    {initials || 'WP'}
                  </span>
                )}
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A259]">
                    Sidebar preview
                  </p>
                  <p className="font-semibold text-white">{profile.displayName || DEFAULTS.displayName}</p>
                  <p className="text-xs text-white/40">{profile.roleLabel || DEFAULTS.roleLabel}</p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/60">Display name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-10 pr-4 text-white outline-none focus:border-[#C9A259]/45"
                    placeholder="WOWPIO Admin"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/60">Role label</label>
                <input
                  type="text"
                  value={profile.roleLabel}
                  onChange={(e) => setProfile({ ...profile, roleLabel: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-white outline-none focus:border-[#C9A259]/45"
                  placeholder="Site owner"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/60">
                  Profile icon
                </label>
                <ImageUploader
                  currentImage={profile.avatarUrl}
                  allowVideo={false}
                  onUploadSuccess={(url) => setProfile({ ...profile, avatarUrl: url })}
                />
                <p className="mt-2 text-[11px] text-white/35">
                  Leave empty / reset to keep the default WP gradient icon.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="rounded-xl bg-[#C9A259] px-8 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F] disabled:opacity-50"
                >
                  {profileSaving ? 'Saving…' : 'Save profile'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Password */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-white">Security</h2>
        <p className="mt-1 text-sm text-white/50">Update your admin password to keep the site secure.</p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8"
        >
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-10 pr-4 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="Enter current password"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <label className="mb-2 block text-xs font-medium text-white/60">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-10 pr-4 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-10 pr-4 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#C9A259] px-8 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] transition-colors hover:bg-[#A8893F] disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
