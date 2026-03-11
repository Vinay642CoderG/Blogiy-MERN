import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoPersonOutline, IoSave, IoCamera } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Card, Button, Input, FormField } from "@/components/ui";
import {
  fetchProfile,
  updateProfile,
  clearError,
} from "@/redux/slices/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImage: null,
    },
  });

  const watchedProfileImage = watch("profileImage");

  // Load profile on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update form when profile data is loaded
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("email", profile.email || "");
      setValue("password", ""); // Never pre-fill password
    }
  }, [profile, setValue]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      const formData = { ...data };

      // Handle file upload
      if (data.profileImage && data.profileImage[0]) {
        formData.profileImage = data.profileImage[0];
      } else {
        delete formData.profileImage;
      }

      // Don't send empty password
      if (!data.password) {
        delete formData.password;
      }

      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("email", profile.email || "");
      setValue("password", "");
      setValue("profileImage", null);
    }
    setIsEditing(false);
  };

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and account settings
          </p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <IoPersonOutline className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image Card */}
        <Card>
          <Card.Content className="p-6">
            <div className="text-center">
              <div className="relative inline-block">
                {profile?._profileImage?.url ? (
                  <img
                    src={profile._profileImage.url}
                    alt={profile.name}
                    className="h-32 w-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                ) : (
                  <FaUserCircle className="h-32 w-32 text-gray-400 mx-auto" />
                )}
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                    <IoCamera className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {profile?.name || "User"}
              </h3>
              <p className="text-sm text-gray-500">Administrator</p>
              <div className="mt-4 text-xs text-gray-400">
                Member since{" "}
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown"}
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Profile Information Card */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <Card.Title>Personal Information</Card.Title>
            </Card.Header>
            <Card.Content className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <FormField
                      label="Full Name"
                      error={errors.name?.message}
                      required
                    >
                      <Input
                        placeholder="Enter your full name"
                        className="h-11"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                          maxLength: {
                            value: 50,
                            message: "Name must not exceed 50 characters",
                          },
                        })}
                      />
                    </FormField>

                    {/* Email Field */}
                    <FormField
                      label="Email Address"
                      error={errors.email?.message}
                      required
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="h-11"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                    </FormField>
                  </div>

                  {/* Password Field */}
                  <FormField
                    label="New Password (optional)"
                    error={errors.password?.message}
                  >
                    <Input
                      type="password"
                      placeholder="Leave blank to keep current password"
                      className="h-11"
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Password must not exceed 20 characters",
                        },
                      })}
                    />
                  </FormField>

                  {/* Profile Image Field */}
                  <FormField
                    label="Profile Image"
                    error={errors.profileImage?.message}
                  >
                    <div className="space-y-3">
                      <Input
                        type="file"
                        accept="image/*"
                        className="h-11 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                        {...register("profileImage")}
                      />
                      {watchedProfileImage && watchedProfileImage[0] && (
                        <div className="text-sm text-gray-600">
                          Selected: {watchedProfileImage[0].name}
                        </div>
                      )}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-700 font-medium">
                          📸 Upload a new profile picture (optional)
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Supported formats: JPG, PNG, GIF • Max size: 5MB
                        </p>
                      </div>
                    </div>
                  </FormField>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                      <IoSave className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {profile?.name || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {profile?.email || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
