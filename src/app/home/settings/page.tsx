'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { updateUserProfile, changePassword, deleteAccount, uploadProfileImage } from '@/lib/api';
import {
  UserSettingsPage,
  ProfileImageSection,
  EditProfileSection,
  ChangePasswordSection,
  ThemeCustomizationSection,
  DeleteAccountSection,
} from '@/components/settings/user-settings';

export default function UserSettings() {
  const { user, logout, updateUser } = useAuth();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { theme, navbarColor, sidebarColor, setTheme, setNavbarColor, setSidebarColor } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profile_image_url || 'https://placehold.co/400x400/png');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name || '');
      setProfileImageUrl(user.profile_image_url || 'https://placehold.co/400x400/png');
    }
  }, [user]);

  const handleProfileUpdate = async (newName: string, newEmail: string) => {
    setMessage('');
    setError('');
    startLoading();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Token de autenticação não encontrado.');
      if (!user) throw new Error('Informações do usuário não disponíveis.');

      const updatedUser = await updateUserProfile(token, user.id, { name: newName, email: newEmail }, startLoading, stopLoading);
      updateUser(updatedUser);
      setMessage('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Falha ao atualizar perfil.');
    } finally {
      stopLoading();
    }
  };

  const handleChangePassword = async (oldPass: string, newPass: string) => {
    setMessage('');
    setError('');
    startLoading();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Token de autenticação não encontrado.');

      await changePassword(token, oldPass, newPass, startLoading, stopLoading);
      setMessage('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      setError(err.message || 'Falha ao alterar senha.');
    } finally {
      stopLoading();
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
      return;
    }
    setMessage('');
    setError('');
    startLoading();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Token de autenticação não encontrado.');

      await deleteAccount(token, startLoading, stopLoading);
      logout();
      setMessage('Conta excluída com sucesso.');
    } catch (err: any) {
      setError(err.message || 'Falha ao excluir conta.');
    } finally {
      stopLoading();
    }
  };

  const handleProfileImageChange = (newImage: string) => {
    // This function will be called by ProfileImageSection when a new image is selected/uploaded
    // For now, we'll just update the preview URL. Actual upload logic is in handleProfileImageUpload.
    setProfileImageUrl(newImage);
  };

  const handleProfileImageUpload = async (file: File) => {
    setMessage('');
    setError('');
    if (!file) {
      setError('Por favor, selecione uma imagem para upload.');
      return;
    }
    startLoading();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Token de autenticação não encontrado.');
      if (!user) throw new Error('Informações do usuário não disponíveis.');

      const formData = new FormData();
      formData.append('file', file);

      const updatedUser = await uploadProfileImage(token, formData, startLoading, stopLoading);
      updateUser({ profile_image_url: updatedUser.profile_image_url });
      setProfileImageUrl(updatedUser.profile_image_url);
      setMessage('Foto de perfil atualizada com sucesso!');
      setProfileImage(null); // Clear the selected file after upload
    } catch (err: any) {
      if (err.message?.includes('Could not validate credentials') || err.message?.includes('Token inválido')) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        setTimeout(() => {
          logout();
          router.push('/login');
        }, 3000);
      } else {
        setError(err.message || 'Falha ao atualizar foto de perfil.');
      }
    } finally {
      stopLoading();
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark');
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando informações do usuário...</p>
      </div>
    );
  }

  return (
    <UserSettingsPage>
      <h1 className="text-3xl font-bold mb-6">Configurações do Usuário</h1>

      {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

      <ProfileImageSection
        currentImage={profileImageUrl}
        onImageChange={handleProfileImageUpload}
        isLoading={isLoading}
      />

      <EditProfileSection
        currentName={name}
        currentEmail={email}
        onSave={handleProfileUpdate}
      />

      <ChangePasswordSection
        onChangePassword={handleChangePassword}
      />

      <ThemeCustomizationSection
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        currentNavbarColor={navbarColor}
        onNavbarColorChange={(color) => {
          setNavbarColor(color);
          localStorage.setItem('navbarColor', color);
        }}
        currentSidebarColor={sidebarColor}
        onSidebarColorChange={(color) => {
          setSidebarColor(color);
          localStorage.setItem('sidebarColor', color);
        }}
      />

      <DeleteAccountSection
        onDeleteAccount={handleDeleteAccount}
      />
    </UserSettingsPage>
  );
}
