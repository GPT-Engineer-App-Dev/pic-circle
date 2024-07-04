export default async function handler(req, res) {
  if (req.method === "GET") {
    // Simulate fetching photos from a database
    const photos = [
      {
        id: 1,
        username: "user1",
        photoUrl: "https://via.placeholder.com/150",
        postedAt: "2 hours ago",
      },
      {
        id: 2,
        username: "user2",
        photoUrl: "https://via.placeholder.com/150",
        postedAt: "5 hours ago",
      },
    ];

    res.status(200).json(photos);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}