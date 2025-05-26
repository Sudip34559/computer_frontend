import { addCourseAPI, getAllCourseAPI } from "@/API/services/courseService";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader, {
  type ImageUploaderRef,
} from "@/layouts/components/ImageUploader";
import { SearchSelect } from "@/layouts/components/SearchSelect";
import { studentSchema } from "@/schemas/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function StudentForm() {
  const navigate = useNavigate();
  const [courses, setcourses] = useState<{ value: string; label: string }[]>([
    {
      value: "",
      label: "",
    },
  ]);
  const [value2, setValue2] = useState("");
  const imageUploaderRef = useRef<ImageUploaderRef>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      dateOfBirth: undefined,
      fathersName: "",
      mothersName: "",
      guardiansName: "",
      maritalStatus: undefined,
      course: "",
      registrationNo: "",
      registrationYear: undefined,
      addmissionDate: undefined,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      adhaarNo: "",
      photo: undefined,
      signature: undefined,
      documents: undefined,
      isCompleted: false,
      isActive: true,
      year: "",
    },
  });
  useEffect(() => {
    getAllCourseAPI()
      .then((res) => {
        setcourses(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  useEffect(() => {
    if (value2) {
      setValue("course", value2);
    }
  }, [value2]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    console.log(formData);
    addCourseAPI(formData)
      .then((res: any) => {
        console.log(res);

        if (res.status === 200) {
          handleReset();
          toast.success("Course created successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          handleReset();
          toast.error("Course already exists");
        } else {
          toast.error("Somthing went wrong");
        }
      });
  };

  const handleReset = () => {
    imageUploaderRef.current?.reset();
    reset();
    setValue2("");
  };

  // console.log(categories);

  return (
    <div className="w-full h-full flex justify-center items-start">
      <Card className="w-full p-4 max-w-7xl gap-y-3">
        <CardHeader className="font-bold  h-[36px] ">
          <div className="w-full h-full  flex justify-between items-center">
            <h2>Add Course</h2>

            <Button
              onClick={() => navigate("/admin/courses")}
              variant="outline"
              className="text-sm font-semibold w-[70px]"
            >
              back
            </Button>
          </div>
        </CardHeader>
        <Separator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-4"
        >
          <div className="flex-2rounded-xl gap-y-4 gap-x-7 grid grid-cols-1 lg:grid-cols-2">
            <div className="gap-2 flex flex-col  ">
              <Label className="text-sm font-semibold">Course Name </Label>
              <SearchSelect
                width="100%"
                data={courses}
                title="Select Course"
                notFound="Not Found"
                value={value2}
                setValue={setValue2}
                placeholder="Search Course"
                className={
                  errors.course ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.course && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.course.message}
                </p>
              )}
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
                className={
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex  gap-3">
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="photo" className="text-sm font-semibold">
                Student Photo
              </Label>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    ref={imageUploaderRef}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.photo?.message}
                    previewUrl="" // optional, for edit
                    maxSizeMB={1}
                  />
                )}
              />
              {errors.photo && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="signature" className="text-sm font-semibold">
                Student Signature
              </Label>
              <Controller
                name="signature"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    ref={imageUploaderRef}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.signature?.message}
                    previewUrl="" // optional, for edit
                    maxSizeMB={1}
                  />
                )}
              />
              {errors.signature && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.signature.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="image" className="text-sm font-semibold">
                Student Document
              </Label>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    ref={imageUploaderRef}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.documents?.message}
                    previewUrl="" // optional, for edit
                    maxSizeMB={1}
                  />
                )}
              />
              {errors.documents && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.documents.message}
                </p>
              )}
            </div>
          </div>
          <Separator />
          <CardFooter className="w-full flex justify-end px-3">
            <Button
              onClick={handleReset}
              type="reset"
              variant="outline"
              className="text-sm font-semibold"
            >
              Refresh
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

export default StudentForm;
