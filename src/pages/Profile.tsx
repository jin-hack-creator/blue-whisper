import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const fetchUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

const updateUserProfile = async (profile) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not logged in");

    const { error } = await supabase.from('profiles').update(profile).eq('id', user.id);
    if (error) throw error;
};

const Profile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: profile, isLoading } = useQuery({ queryKey: ['profile'], queryFn: fetchUserProfile });

  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setAvatarPreview(profile.avatar_url || null);
    }
  }, [profile]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({ title: "Profil mis à jour avec succès !" });
    },
    onError: () => {
        toast({ title: "Erreur lors de la mise à jour du profil", variant: "destructive" });
    }
  });

  const handleUpdateProfile = async () => {
    let avatar_url = profile?.avatar_url;

    if (avatarFile) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(`${user.id}/profile.png`, avatarFile, { upsert: true });

        if (error) {
            console.error("Error uploading avatar:", error);
            toast({ title: "Erreur lors du téléchargement de l'avatar", variant: "destructive" });
            return;
        }
        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
        avatar_url = publicUrlData.publicUrl;
    }

    mutation.mutate({ username, avatar_url });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <div className="space-y-4">
        <div>
          <label>Avatar</label>
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
        </div>
        <div>
          <label>Pseudo</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <Button onClick={handleUpdateProfile} disabled={mutation.isPending}>
          {mutation.isPending ? 'Mise à jour...' : 'Mettre à jour'}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
