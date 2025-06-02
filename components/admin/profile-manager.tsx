// components\admin\profile-manager.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Save, User, Upload, X, Camera, ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

type Profile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  objective: string;
  resumeUrl: string;
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
};

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile>({
    name: "Nayon Kanti Halder",
    email: "nrbnayon@gmail.com",
    phone: "+880 1934025581",
    location: "Vatara, Dhaka, Bangladesh",
    bio: "",
    objective: "",
    resumeUrl: "",
    profileImage: "",
    socialLinks: {
      github: "https://github.com/nrbnayon",
      linkedin: "https://www.linkedin.com/in/itsnayon",
      twitter: "",
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // New state to track pending file upload
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.profileImage) {
      setPreviewUrl(profile.profileImage);
    }
  }, [profile.profileImage]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile({ ...profile, ...data });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfileToDatabase = async (updatedProfile: Profile) => {
    try {

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(
          errorData.details || errorData.error || "Failed to update profile"
        );
      }

      const result = await response.json();
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save profile to database",
        variant: "destructive",
      });
      return false;
    }
  };

  const uploadToCloudinary = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return null;
    }

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Portfolio"); // Make sure this preset exists in your Cloudinary settings

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/nayon/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Cloudinary error:", result);
        throw new Error(
          result.error?.message ||
            `Upload failed with status: ${response.status}`
        );
      }

      if (result.secure_url || result.url) {
        const imageUrl = (result.secure_url || result.url).toString();
        return imageUrl;
      } else {
        throw new Error("No URL returned from Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      let errorMessage = "Failed to upload image. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("Invalid upload preset")) {
          errorMessage =
            "Upload configuration error. Please check your Cloudinary settings.";
        } else if (error.message.includes("401")) {
          errorMessage =
            "Authentication failed. Please check your Cloudinary credentials.";
        } else if (error.message.includes("400")) {
          errorMessage =
            "Invalid request. Please check your file and try again.";
        }
      }

      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };

  const handleFileSelect = async (file: File) => {
    // Store the file for later upload
    setPendingFile(file);
    setHasUnsavedChanges(true);

    // Create preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image Selected",
      description:
        "Click 'Save Changes' to upload and save your profile picture.",
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setProfile({ ...profile, profileImage: "" });
    setPreviewUrl("");
    setPendingFile(null);
    setHasUnsavedChanges(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast({
      title: "Image Removed",
      description: "Click 'Save Changes' to update your profile.",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let updatedProfile = { ...profile };

      // If there's a pending file, upload it to Cloudinary first
      if (pendingFile) {
        toast({
          title: "Uploading Image",
          description: "Uploading image to Cloudinary...",
        });

        const imageUrl = await uploadToCloudinary(pendingFile);
        if (imageUrl) {
          updatedProfile.profileImage = imageUrl;
          setProfile(updatedProfile);
          setPendingFile(null);

          toast({
            title: "Upload Successful",
            description: "Image uploaded successfully. Saving profile...",
          });
        } else {
          // If upload failed, don't proceed with save
          return;
        }
      }

      // Save the profile to database
      const success = await saveProfileToDatabase(updatedProfile);
      if (success) {
        setHasUnsavedChanges(false);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handle manual URL input - only update local state and preview
  const handleProfileImageUrlChange = (url: string) => {
    setProfile({ ...profile, profileImage: url });
    setPreviewUrl(url);
    setPendingFile(null); // Clear any pending file if URL is manually entered
    setHasUnsavedChanges(true);
  };

  // Handle any other profile field changes
  const handleProfileFieldChange = (field: string, value: string | object) => {
    setProfile({ ...profile, [field]: value });
    setHasUnsavedChanges(true);
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Profile Management</h2>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          variant={hasUnsavedChanges ? "default" : "secondary"}
        >
          <Save className='h-4 w-4 mr-2' />
          {isSaving ? "Saving..." : "Save Changes"}
          {hasUnsavedChanges && " *"}
        </Button>
      </div>

      {hasUnsavedChanges && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-md p-3'>
          <p className='text-sm text-yellow-800'>
            You have unsaved changes. Click "Save Changes" to update your
            profile.
          </p>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                value={profile.name}
                onChange={(e) =>
                  handleProfileFieldChange("name", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={profile.email}
                onChange={(e) =>
                  handleProfileFieldChange("email", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                value={profile.phone}
                onChange={(e) =>
                  handleProfileFieldChange("phone", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                value={profile.location}
                onChange={(e) =>
                  handleProfileFieldChange("location", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Camera className='h-5 w-5' />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Image Preview */}
            {previewUrl && (
              <div className='relative w-32 h-32 mx-auto'>
                <img
                  src={previewUrl}
                  alt='Profile preview'
                  className='w-full h-full object-cover rounded-full border-4 border-gray-200'
                />
                <Button
                  size='sm'
                  variant='destructive'
                  className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0'
                  onClick={removeImage}
                >
                  <X className='h-3 w-3' />
                </Button>
                {pendingFile && (
                  <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded'>
                      Ready to upload
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              } ${isSaving ? "opacity-50 pointer-events-none" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileInputChange}
                className='absolute inset-0 opacity-0 cursor-pointer'
                disabled={isSaving}
              />

              <div className='space-y-2'>
                <ImageIcon className='h-8 w-8 text-gray-400 mx-auto' />
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>
                    Drop your image here, or{" "}
                    <span className='text-primary underline cursor-pointer'>
                      browse
                    </span>
                  </p>
                  <p className='text-xs text-gray-500'>
                    Supports: JPEG, PNG (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Manual URL Input */}
            <div className='pt-4 border-t'>
              <Label htmlFor='profileImageUrl'>
                Or enter image URL manually
              </Label>
              <div className='flex gap-2'>
                <Input
                  id='profileImageUrl'
                  value={profile.profileImage}
                  onChange={(e) => handleProfileImageUrlChange(e.target.value)}
                  placeholder='https://example.com/profile.jpg'
                />
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => setPreviewUrl(profile.profileImage)}
                  disabled={!profile.profileImage}
                >
                  Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='objective'>Career Objective</Label>
              <Textarea
                id='objective'
                value={profile.objective}
                onChange={(e) =>
                  handleProfileFieldChange("objective", e.target.value)
                }
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                value={profile.bio}
                onChange={(e) =>
                  handleProfileFieldChange("bio", e.target.value)
                }
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor='resumeUrl'>Resume URL</Label>
              <Input
                id='resumeUrl'
                value={profile.resumeUrl}
                onChange={(e) =>
                  handleProfileFieldChange("resumeUrl", e.target.value)
                }
                placeholder='https://example.com/resume.pdf'
              />
            </div>
          </CardContent>
        </Card>

        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <Label htmlFor='github'>GitHub</Label>
              <Input
                id='github'
                value={profile.socialLinks.github}
                onChange={(e) =>
                  handleProfileFieldChange("socialLinks", {
                    ...profile.socialLinks,
                    github: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor='linkedin'>LinkedIn</Label>
              <Input
                id='linkedin'
                value={profile.socialLinks.linkedin}
                onChange={(e) =>
                  handleProfileFieldChange("socialLinks", {
                    ...profile.socialLinks,
                    linkedin: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor='twitter'>Twitter</Label>
              <Input
                id='twitter'
                value={profile.socialLinks.twitter}
                onChange={(e) =>
                  handleProfileFieldChange("socialLinks", {
                    ...profile.socialLinks,
                    twitter: e.target.value,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
