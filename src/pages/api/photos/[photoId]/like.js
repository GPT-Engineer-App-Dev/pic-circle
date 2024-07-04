export default async function handler(req, res) {
  if (req.method === "POST") {
    const { photoId } = req.query;
    // Simulate liking a photo
    res.status(200).json({ success: true, photoId });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}