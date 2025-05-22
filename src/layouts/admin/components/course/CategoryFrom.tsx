import { addCourseCategoryAPI } from "@/API/services/courseService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function CategoryFrom({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) {
  const categorySchema = z.object({
    name: z.string().min(1, "Category is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "", // default email value
    },
  });
  const onSubmit = (data: any) => {
    addCourseCategoryAPI(data)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          setIsOpen();
          reset();
          toast.success("Category added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          reset();
          toast.error("Category already exists");
        }
        setIsOpen();
      });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/[0.4] z-50">
      <Card className="w-[400px] py-3 flex-col gap-2">
        <CardHeader className="w-full flex justify-start px-3 items-center">
          <p className="font-bold">Add Category</p>
        </CardHeader>
        <Separator />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <CardContent className="w-full flex flex-col gap-2 px-3">
            <Label htmlFor="category" className="text-sm font-semibold">
              Category Name
            </Label>
            <Input
              type="text"
              id="category"
              autoComplete="off"
              placeholder="Enter Category"
              className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm ml-1">{errors.name.message}</p>
            )}
          </CardContent>
          <Separator className="mt-4" />
          <CardFooter className="w-full flex justify-end px-3">
            <Button
              variant="outline"
              className="text-sm font-semibold"
              onClick={() => {
                setIsOpen();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2 text-sm font-semibold">
              Add
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CategoryFrom;
