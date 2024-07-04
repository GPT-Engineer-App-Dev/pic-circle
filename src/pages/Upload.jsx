import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const uploadPhoto = async (data) => {
  const formData = new FormData();
  formData.append("photo", data.photo[0]);
  formData.append("caption", data.caption);
  formData.append("tags", data.tags);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload photo");
  }

  return response.json();
};

const UploadPage = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);

  const mutation = useMutation(uploadPhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries(["photos"]);
      toast("Photo uploaded successfully!");
      reset();
      setImage(null);
    },
    onError: () => {
      toast.error("Failed to upload photo");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Photo
        </label>
        <Input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleImageChange}
          {...register("photo", { required: true })}
        />
        {image && <img src={image} alt="Preview" className="mt-2 w-full" />}
      </div>
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
          Caption
        </label>
        <Textarea id="caption" {...register("caption")} />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <Input id="tags" {...register("tags")} />
      </div>
      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};

export default UploadPage;