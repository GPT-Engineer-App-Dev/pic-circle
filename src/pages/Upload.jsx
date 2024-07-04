import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const UploadPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default UploadPage;