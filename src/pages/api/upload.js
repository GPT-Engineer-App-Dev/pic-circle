export default async function handler(req, res) {
  if (req.method === "POST") {
    // Simulate saving the photo and returning the saved photo data
    const { caption, tags } = req.body;
    const photoUrl = "/uploads/" + req.file.filename; // Simulated photo URL

    res.status(200).json({ id: Date.now(), username: "currentUser", photoUrl, postedAt: "Just now", caption, tags });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}