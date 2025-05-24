import { getAllCourseCategoryStatusAPI } from "@/API/services/courseService";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SearchSelect } from "@/layouts/components/SearchSelect";
import { courseSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function CourseForm() {
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([
    {
      value: "",
      label: "",
    },
  ]);
  const [value, setValue] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      category: "",
      price: 0,
      branchprice: 0,
      duration: 0,
    },
  });
  useEffect(() => {
    getAllCourseCategoryStatusAPI()
      .then((res) => {
        setCategories(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  useEffect(() => {
    if (value) {
      reset({
        ...getValues(), // keep previous form data
        category: value, // override only category
      });
    }
  }, [value]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // console.log(categories);

  return (
    <div className="w-full h-full flex justify-center items-start">
      <Card className="w-full   p-4 max-w-7xl">
        <CardHeader className="font-bold">Add Course</CardHeader>
        <Separator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-4"
        >
          <div className="flex-2rounded-xl gap-y-4 gap-x-7 grid grid-cols-1 lg:grid-cols-2">
            <div className="gap-2 flex flex-col  ">
              <Label className="text-sm font-semibold">Course Category</Label>
              <SearchSelect
                width="100%"
                data={categories as [{ value: string; label: string }]}
                title="Select Category"
                notFound="Not Found"
                value={value}
                setValue={setValue}
                placeholder="Search Category"
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="name" className="text-sm font-semibold">
                Course Name
              </Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                autoComplete="off"
                placeholder="Course Name"
              />
            </div>

            <div className="gap-2 flex flex-col ">
              <Label htmlFor="duration" className="text-sm font-semibold">
                {`Course Duration (Month)`}
              </Label>
              <Input
                type="number"
                id="duration"
                {...register("duration")}
                autoComplete="off"
                placeholder="Course Duration"
              />
            </div>

            <div className="gap-2 flex flex-col ">
              <Label htmlFor="price" className="text-sm font-semibold">
                Course Price
              </Label>
              <Input
                type="number"
                id="price"
                {...register("price")}
                autoComplete="off"
                placeholder="Course Price"
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="branchprice" className="text-sm font-semibold">
                Branch Price
              </Label>
              <Input
                type="number"
                id="branchprice"
                {...register("branchprice")}
                autoComplete="off"
                placeholder="Branch Price"
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="image" className="text-sm font-semibold">
                Course Image
              </Label>
              <Input
                type="file"
                id="image"
                {...register("image")}
                autoComplete="off"
                placeholder="Course Image"
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="description" className="text-sm font-semibold">
                Course Description
              </Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Course Description"
              />
            </div>
          </div>
          <Separator />
          <CardFooter className="w-full flex justify-end px-3">
            <Button
              onClick={() => reset()}
              variant="outline"
              className="text-sm font-semibold"
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2 text-sm font-semibold">
              {"Add"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CourseForm;
