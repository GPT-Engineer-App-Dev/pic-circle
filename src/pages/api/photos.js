export default async function handler(req, res) {
  if (req.method === "GET") {
    // Simulate fetching photos from a database
    const photos = [
      {
        id: 1,
        username: "user1",
        photoUrl: "https://via.placeholder.com/150",
        postedAt: "2 hours ago",
        likes: 10,
        liked: false,
      },
      {
        id: 2,
        username: "user2",
        photoUrl: "https://via.placeholder.com/150",
        postedAt: "5 hours ago",
        likes: 5,
        liked: true,
      },
    ];

    res.status(200).json(photos);
  } else if (req.method === "POST") {
    const { photoId } = req.query;
    // Simulate liking a photo
    res.status(200).json({ success: true, photoId });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}