import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

const fetchPhotos = async () => {
  const response = await fetch("/api/photos");
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  return response.json();
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading photos</div>;

  return (
    <div className="space-y-4">
      {data.map((photo) => (
        <Card key={photo.id}>
          <CardHeader>
            <CardTitle>{photo.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={photo.photoUrl} alt="User's post" className="w-full" />
            <div className="flex justify-between mt-2">
              <span>{photo.postedAt}</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Index;
