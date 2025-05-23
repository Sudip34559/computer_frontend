import { getAllCourseCategoryStatusAPI } from "@/API/services/courseService";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SearchSelect } from "@/layouts/components/SearchSelect";
import { useEffect, useState } from "react";

function CourseFrom() {
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([
    {
      value: "",
      label: "",
    },
  ]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getAllCourseCategoryStatusAPI()
      .then((res) => {
        setCategories(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []); // ✅ should only run once

  console.log(categories);

  return (
    <Card className="w-full h-full p-4 max-w-7xl">
      <CardHeader className="font-bold">Add Course</CardHeader>
      <Separator />
      <div className="flex-2rounded-xl gap-3 grid grid-cols-1 lg:grid-cols-2">
        <div className="gap-2 flex flex-col  ">
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
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
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
          <Input
            type="text"
            id="nmae"
            autoComplete="off"
            placeholder="Course Name"
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
          <Input
            type="text"
            id="nmae"
            autoComplete="off"
            placeholder="Course Name"
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
          <Input
            type="text"
            id="nmae"
            autoComplete="off"
            placeholder="Course Name"
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
          <Input
            type="text"
            id="nmae"
            autoComplete="off"
            placeholder="Course Name"
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
          <Input
            type="text"
            id="nmae"
            autoComplete="off"
            placeholder="Course Name"
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <Label htmlFor="nmae" className="text-sm font-semibold">
            Category Name
          </Label>
          <Input
            type="text"
            id="nmae"
            autoComplete="off"
            placeholder="Course Name"
          />
        </div>
      </div>
    </Card>
  );
}

export default CourseFrom;
