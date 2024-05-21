import ProfileForm from './components/profile-form';

const ProfilePage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 md:p-8 pt-4">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
