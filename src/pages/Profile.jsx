import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fetchUserProfile = async () => {
  // Replace with actual API call
  return {
    username: "user1",
    bio: "This is my bio",
    photos: [
      {
        id: 1,
        photoUrl: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        photoUrl: "https://via.placeholder.com/150",
      },
    ],
  };
};

const Profile = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{data.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.bio}</p>
          <Button variant="outline" className="mt-2">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {data.photos.map((photo) => (
          <img key={photo.id} src={photo.photoUrl} alt="User's post" className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default Profile;